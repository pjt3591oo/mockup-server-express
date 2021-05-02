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

router.get('/:id', function(req, res, next) {
  let {id} = req.params;
  if (temp.length -1 < id) {
    return res.status(404).json({});  
  }
  return res.status(200).json(temp[id]);
});

router.post('/', (req, res) => {
  let { title, author } = req.body;
  let data = makeData(title, author);
  temp.push(data);

  return res.status(201).json(data);
})

module.exports = router;
