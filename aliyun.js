const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'), {multiArgs: true});
const mqtt = require('mqtt');
const crypto = require('crypto');

function signature(appKey, appSecret, deviceId, deviceSecret) {
  const data = `appKey${appKey}deviceId${deviceId}`;
  const secret = appSecret + deviceSecret;
  const hmac = crypto.createHmac('md5', secret);
  hmac.update(data);
  return hmac.digest('hex').toUpperCase();
}

function createUsername(appKey, appSecret, deviceId, deviceSecret) {
  const data = appKey + appSecret + deviceId + deviceSecret;
  const hash = crypto.createHash('md5');
  hash.update(data);
  return hash.digest('hex').toUpperCase();
}

function verify() {
  throw new Error('not implements');
}

const auth = Promise.coroutine(function*(appKey, appSecret, deviceId, deviceSecret) {
  const aliyun = 'http://manager.channel.aliyun.com/iot/auth';
  const sign = signature(appKey, appSecret, deviceId, deviceSecret);

  const replies = yield request.getAsync(aliyun, {json: true, qs: {deviceId, appKey, sign}});
  const responseData = replies[1];
  const pubkey = new Buffer(responseData.pubkey, 'base64');
  const serverInfo = responseData.servers.split(':');
  const host = serverInfo[0];
  const port = serverInfo[1].split('|');

  return {pubkey, host, port};
});

const connect = Promise.coroutine(function*(appKey, appSecret, deviceId, deviceSecret) {

  const authResult = yield auth(appKey, appSecret, deviceId, deviceSecret);
  const pubkey = authResult.pubkey;
  const host = authResult.host;
  const port = authResult.port;
  console.log(pubkey.toString());
  return mqtt.connect(`tls://${host}:${port[0]}`, {
    clientId: appKey + ':' + deviceId,
    username: createUsername(appKey, appSecret, deviceId, deviceSecret),
    rejectUnauthorized: false,
    cert: pubkey
  });

});

module.exports = connect;
