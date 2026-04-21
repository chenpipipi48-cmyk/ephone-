// 引入 ws 模块
const WebSocket = require('ws');

// 获取端口号，优先使用环境变量，否则默认 8080
const PORT = process.env.PORT || 8080;

// 创建一个 WebSocket 服务器
const wss = new WebSocket.Server({ port: PORT });

// 当有客户端连接时触发
wss.on('connection', function connection(ws) {
  console.log('有客户端连接');

  // 当收到客户端消息时触发
  ws.on('message', function incoming(message) {
    console.log('收到消息：', message.toString());
  });

  // 当客户端断开连接时触发
  ws.on('close', function close() {
    console.log('有客户端断开连接');
  });
});

console.log(`WebSocket 服务器已启动，监听端口 ${PORT}`);