const axios = require('axios');

const data = JSON.stringify({
  "action": "ping"
});

const config = {
  method: 'post',
  url: 'http://localhost:3000/rpc',
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
