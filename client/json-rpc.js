const axios = require('axios');

const data = JSON.stringify({
  "jsonrpc": "2.0", 
  "method": "echo", 
  "params": {text: "hello world"}, 
  "id": null
});

const config = {
  method: 'post',
  url: 'http://localhost:3000/json-rpc',
  headers: { 
    'Content-Type': 'application/json', 
  },
  data : data
};

axios(config)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
