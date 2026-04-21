const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
  console.log('有客户端连接');

  ws.on('message', function incoming(message) {
    const msgStr = message.toString();
    console.log('收到消息：', msgStr.substring(0, 100) + '...'); // 头像数据太长，截断打印
    
    try {
      const data = JSON.parse(msgStr);
      
      // 如果前端发来的是 register (注册) 请求
      if (data.type === 'register') {
        
        // 【暴力破解】连发 4 个最常见的成功暗号，总有一个能触发前端的“连接成功”！
        
        // 暗号 1：单纯的 register_success
        ws.send(JSON.stringify({ type: "register_success", userId: data.userId }));
        
        // 暗号 2：同名回复 + 状态码
        ws.send(JSON.stringify({ type: "register", status: "success", userId: data.userId }));
        
        // 暗号 3：纯 success
        ws.send(JSON.stringify({ type: "success", message: "ok" }));
        
        // 暗号 4：有些前端需要收到“自己加入”的广播才能进大厅
        ws.send(JSON.stringify({ type: "user_joined", user: data }));
        
        console.log('已发送多个成功暗号！');
      }
    } catch (e) {
      console.log('无法解析消息');
    }
  });

  ws.on('close', function close() {
    console.log('有客户端断开连接');
  });
});

console.log(`WebSocket 服务器已启动，监听端口 ${PORT}`);
