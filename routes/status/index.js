const express = require('express');
const router = express.Router();

const status200 = require('./200');
const status400 = require('./400');
const status500 = require('./500');

router.use('/2xx', status200);
router.use('/4xx', status400);
router.use('/5xx', status500);

module.exports = router;
