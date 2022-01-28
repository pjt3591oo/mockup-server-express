const WebSocket  = require("ws");
const http = require('http');

function init(httpServer) {
  if (!httpServer) {
    httpServer = http.createServer();
    httpServer.listen(3000);
  }
  
  const wsServer = new WebSocket.Server({
    server: httpServer
  });
  
  wsServer.on("connection", (socket) => {
    socket.on('message', function(message) {
      console.log(`[ws] receive message: ${message.toString()}`)
      if (message.type === 'utf8') {
          console.log('Received Message: ' + message.utf8Data);
          socket.sendUTF(message.utf8Data);
      } else if (message.type === 'binary') {
          console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
          socket.sendBytes(message.binaryData);
      } else {
        socket.send(JSON.stringify({data: "hello", ts: new Date().getTime()}));
      }
    });
  })
}

module.exports = init;