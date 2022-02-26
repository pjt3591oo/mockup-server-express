const passport = require('passport');
const express = require('express');

const loggerWinston = require('../../utils/logger');

const router = express.Router()

const loginCheckMiddleware = (req, res, next) => {
  loggerWinston.debug(`session login check: ${req.isAuthenticated()}`);

  if (!req.isAuthenticated()) return res.status(401).json();

  next()
}

// 로그인
// authenticate는 passport.use에서 지정한 이름을 사용한다. default: local
router.post('/', passport.authenticate('session-base'), (req, res) => {
  console.log(req.session)
  return res.status(201).json(req.user)
})

// 유저정보 조회
// 세션 만료시간 60,000ms 이므로 로그인 후 1분이 지나면 로그인 상태가 해제된다.
// 로그인 후 만료시간이 지나지 않더라도 로그아웃을 수행하면 로그인 상태가 해제된다.
router.get('/', loginCheckMiddleware, (req, res) => {
  console.log(req.session)
  return res.json(req.user)
})

// 로그아웃
router.post('/logout', (req, res) => {
  req.logout()
  return res.status(201).json()
})

module.exports = router