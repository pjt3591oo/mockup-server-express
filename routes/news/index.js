const express = require('express');
const data = require('./data.json');
const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json(data);
})

module.exports = router;