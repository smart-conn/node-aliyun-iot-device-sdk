'use strict';

const appKey = '23359717';
const appSecret = '381266bfee68b5e163aec7b4c8fd0a1b';

const deviceId = '1dfd5d423d0a4c88a81b0e65e514f9e8';
const deviceSecret = 'f834d28f8e814af582ab7029e78fb0a2';

const aliyun = require('./aliyun');

aliyun(appKey, appSecret, deviceId, deviceSecret)
  .then((client) => {
    client.subscribe(`${appKey}/deviceId/${deviceId}`);
    client.on('message', function(topic, message) {
      console.log('received:', message.toString());
    });
  })
  .catch((e) => {
    console.error(e);
  });
