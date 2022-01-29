
const { JSONRPCServer } = require("json-rpc-2.0");
const express = require('express');
const jsonRPCServer = new JSONRPCServer();

function init(httpServer) {
  if (!httpServer) {
    httpServer = express();
    httpServer.listen(3000);
  }

  jsonRPCServer.addMethod("echo", ({text}) => text + ' pong');
  jsonRPCServer.addMethod("log", ({ message }) => console.log(message));

  httpServer.post('/json-rpc', async (req, res) => {
    const jsonRPCRequest = req.body;
    const response = await jsonRPCServer.receive(jsonRPCRequest)

    if (!response) return res.status(204).json({});
    return res.status(200).send(response);
  })
}

module.exports = init;