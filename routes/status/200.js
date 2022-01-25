var express = require('express');
var router = express.Router();

router.get('/200', (req, res, next) => {
  return res.status(200).json({msg: 'success', method: 'get'});
})
router.post('/200', (req, res, next) => {
  return res.status(200).json({msg: 'success', method: 'post'});
})

router.get('/201', (req, res, next) => {
  return res.status(201).json({msg: 'created', method: 'get'});
})
router.post('/201', (req, res, next) => {
  return res.status(201).json({msg: 'created', method: 'post'});
})

router.get('/203', (req, res, next) => {
  return res.status(203).json({msg: '203', method: 'get'});
})
router.post('/203', (req, res, next) => {
  return res.status(203).json({msg: '203', method: 'post'});
})

module.exports = router;
