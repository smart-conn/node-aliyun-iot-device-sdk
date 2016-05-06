'use strict';

const appKey = '23359717';
const appSecret = '381266bfee68b5e163aec7b4c8fd0a1b';

const deviceId = 'e631135eef294591b2ea31d83d47bb15';
const deviceSecret = 'c2ce6fed2cfc4189a41c36584cb7145b';

const aliyun = require('./aliyun');

aliyun(appKey, appSecret, deviceId, deviceSecret)
  .then((client) => {
    const client1 = '1dfd5d423d0a4c88a81b0e65e514f9e8';

    client.publish(`${appKey}/deviceId/${client1}`, 'this is a message');
  })
  .catch((e) => {
    console.error(e);
  });
