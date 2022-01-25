var express = require('express');
var router = express.Router();

router.get('/500', (req, res, next) => {
  return res.status(500).json({msg: 'Internal Server Error', method: 'get'});
})
router.post('/500', (req, res, next) => {
  return res.status(500).json({msg: 'Internal Server Error', method: 'post'});
})

router.get('/501', (req, res, next) => {
  return res.status(501).json({msg: 'Not implemented', method: 'get'});
})
router.post('/501', (req, res, next) => {
  return res.status(501).json({msg: 'Not implemented', method: 'post'});
})

router.get('/502', (req, res, next) => {
  return res.status(502).json({msg: 'Bad Gateway', method: 'get'});
})
router.post('/502', (req, res, next) => {
  return res.status(502).json({msg: 'Bad Gateway', method: 'post'});
})

module.exports = router;
