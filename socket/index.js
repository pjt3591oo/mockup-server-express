const socket = require("socket.io");

function init(httpServer) {

  const io = socket(httpServer);
  
  // adapter configuration
  // io.adapter(require("socket.io-redis")({ host: "localhost", port: 6379 }));

  io.on('connection', (socket) => {
    console.log('[socket.io] connected socketId: ', socket.id);
    socket.on('ping', data => {
      console.log(`[socket.io] receive ping: ${data}`)
      socket.emit('pong', `${new Date().getTime()} pong pong pong`);
    })
  })
}

module.exports = init;