const express = require('express');
const router = express.Router();

const multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)

const storage = multer.diskStorage({ 
  destination: function (req, file, cb) {
    cb(null, 'upload/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    const didSplit = file.originalname.split('.');
    const ext = didSplit[didSplit.length - 1]
    cb(null, `${new Date().getTime()}.${ext}`) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})

const upload = multer({ storage: storage })

// {id: 0, name: 'image.png', path: '/'}
const files = [];

router.post('/', upload.single('file'), (req, res) => {
  console.log(req.file);
  console.log(req.files);
  const file = {
    id: files.length,
    name: req.file.filename,
    path: req.file.path
  }
  files.push(file);
  return res.status(201).json(file)
});

router.get('/', (req, res) => {
  return res.status(200).json([...files].reverse());
})

module.exports = router;