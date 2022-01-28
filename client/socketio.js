const { io } = require("socket.io-client");

const socket = io("ws://localhost:4000", {
  transports: ['websocket', 'polling'],
});

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  setInterval(() => {
    console.log('[socket.io] event emit: ping');
    socket.emit('ping', `${new Date().getTime()} ping ping ping`)
  }, 3000)
});

socket.on('pong', data => {
  console.log(`[socket.io] receive pong: ${data}`)
})