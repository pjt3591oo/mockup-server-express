var express = require('express');
var router = express.Router();

router.get('/400', (req, res, next) => {
  return res.status(400).json({msg: 'Bad Request', method: 'get'});
})
router.post('/400', (req, res, next) => {
  return res.status(400).json({msg: 'Bad Request', method: 'post'});
})

router.get('/401', (req, res, next) => {
  return res.status(401).json({msg: 'Unauthorized', method: 'get'});
})
router.post('/401', (req, res, next) => {
  return res.status(401).json({msg: 'Unauthorized', method: 'post'});
})

router.get('/403', (req, res, next) => {
  return res.status(403).json({msg: 'Forbidden', method: 'get'});
})
router.post('/403', (req, res, next) => {
  return res.status(403).json({msg: 'Forbidden', method: 'post'});
})

module.exports = router;
