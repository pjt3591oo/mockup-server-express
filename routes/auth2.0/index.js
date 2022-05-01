const express = require('express')
const { consoleService, auth2Service } = require('./service');

const router = express.Router();

// 인증키 발급
router.get('/console', (req, res) => {
  return res.render('auth2.0/console')
})

router.post('/console', (req, res) => {

  const { name, allowUrl, redirectUrl } = req.body;

  if (!name || !allowUrl || !redirectUrl) {
    return res.status(400).json('not vaild data');
  }

  return res.status(201).json(
    consoleService.add(name, allowUrl, redirectUrl)
  )
})

// 로그인
router.get('/signin', (req, res) => {
  const { client_id, redirect_url, scope } = req.query;
  const isExist = consoleService.findByClientId(client_id);
  return res.render('auth2.0/signin', {isExist})
})

router.post('/signin', (req, res) => {
  const { email } = req.body;
  const user = auth2Service.findUserByEmail(email)
  console.log(user)
  if (!user) {
    return res.status(401).json('not vaild data');
  }

  return res.status(200).json({...user, code: new Date().getTime().toString()})
})

router.post('/exchange', (req, res) => {
  const { code, clientSecret, clientId } = req.body;

  return res.status(201).json({
    accessToken: new Date().getTime().toString(),
  })
})


// 테스트
// 해당 페이지를 접속해서 구글 로그인 버튼처럼 멍개 로그인 버튼을 누르면 /oauth2.0/signin?client_id=&redirect_url=&code=을 띄워준다
router.get('/test/signin', (req, res) => {
  return res.render('auth2.0/tester/signin');
})
router.get('/test/signin/success/callback', (req, res) => {
  const { code } = req.query;
  console.log(code);
  return res.render(`auth2.0/tester/signinSuccess`, { code });
})
router.post('/test/token', (req, res) => {
  const {code, clientId, clientSecret} = req.body;

  if (!code || !clientId || !clientSecret) {
    return res.status(400).json('not vaild data');
  }

  return res.status(200).json({
    access_token: new Date().getTime().toString(),
  })
})
module.exports = router;
