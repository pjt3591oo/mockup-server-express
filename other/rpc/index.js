const http = require('http');
const path = require('path');
const RPC = require('rpc');

function init(httpServer) {
  if (!httpServer) {
    httpServer = http.createServer();
    httpServer.listen(3000);
  }

  const rpcServer = RPC(
    '/',  // url path
    path.join(__dirname, './handler'), 
    { cors: true }
  )
  
  httpServer.post('/rpc', rpcServer);
}

module.exports = init;