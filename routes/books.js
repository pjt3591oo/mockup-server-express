const express = require('express');
const router = express.Router();

let temp = [
  makeData('mung-book1', 'mung-1'),
  makeData('mung-book2', 'mung-2'),
  makeData('mung-book3', 'mung-3'),
  makeData('mung-book4', 'mung-4'),
]

function makeData(title, author) {
  return {
    title, author
  }
}

router.get('/', function(req, res, next) {
  console.log(req.headers)
  return res.status(200).json(temp)
});

router.post('/', (req, res) => {
  let { title, author } = req.body;
  let data = makeData(title, author);
  temp.push(data);

  return res.status(201).json(data);
})

module.exports = router;
