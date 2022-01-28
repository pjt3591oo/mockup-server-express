const WebSocketClient = require('websocket').client;

const client = new WebSocketClient();
client.connect('ws://127.0.0.1:3000');

client.on('connect', function (connection) {
    console.log(`WebSocket Client Connected: ${connection.remoteAddress}`);

    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    setInterval(() => {
        const data0 = { a: 10, ts: new Date().getTime() };
        console.log('send data', data0)
        connection.send(JSON.stringify(data0))
    }, 3000)
});

