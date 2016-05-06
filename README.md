# node-aliyun-iot-device-sdk

阿里云 IoT 服务的 MQTT client

这个包处理了阿里云签名与授权的过程

使用方法

```js
const aliyun = require('aliyuniot');

aliyun('appKey', 'appSecret', 'deviceId', 'deviceSecret').then(function(client) {

  // 这里的 client 就是 mqtt 的客户端，参考：https://github.com/mqttjs/MQTT.js
  
  client.subscribe('topic');
  client.on('message', function(topic, msg) {
  
  });


});
```
