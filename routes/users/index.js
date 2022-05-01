const express = require('express');
const router = express.Router();

let temp = [
  makeData('mung1', 1),
  makeData('mung2', 2),
  makeData('mung3', 3),
  makeData('mung4', 4),
]

function makeData(name, age) {
  return {
    name, age
  }
}

router.get('/page', function(req, res, next) {
  return res.render('user', {});
})

router.get('/', function(req, res, next) {
  temp.push(makeData('mung5', 5));
  setTimeout(() => {
    return res.status(200).json({
      total: temp.length,
      results: temp
    })
  }, 1500)
});

router.post('/', (req, res) => {

  let { name, age } = req.body;
  let data = makeData(name, age);
  temp.push(data);

  return res.status(201).json(data);
})

module.exports = router;
