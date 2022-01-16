const socket = require("socket.io");

function init(httpServer) {

  const io = socket(httpServer);
  
  // adapter configuration
  // io.adapter(require("socket.io-redis")({ host: "localhost", port: 6379 }));

  io.on('connection', (socket) => {
    console.log('connected socketId: ', socket.id);
    socket.on('ping', data => {
      console.log(`[receive] ping: ${data}`)
      socket.emit('pong', 'pong pong pong');
    })
  })
}

module.exports = init;