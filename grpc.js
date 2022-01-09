const PROTO_PATH = './protos/helloworld.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
const routes = protoDescriptor.helloworld;

function sayHello(call, callback) {
  console.log(call.request)
  callback(null, {message: 'Hello ' + call.request.name});
}

function main(port = '50051') {
  const server = new grpc.Server();
  server.addService(
    routes.Greeter.service, {
      sayHello
    }
  );
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

module.exports = main;