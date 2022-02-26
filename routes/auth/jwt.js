const express = require('express');
const passport = require('passport')

const loggerWinston = require('../../utils/logger');

const router = express.Router()

// 로그인
router.post('/', passport.authenticate('jwt-create'), (req, res) => {
  return res.status(201).json({token: req.session.passport.user})
})

// 유저정보 조회
router.get('/', passport.authenticate('jwt-verify'), (req, res) => {
  loggerWinston.debug(req.user)
  return res.status(200).json(req.user);
})

// 로그아웃
router.post('/logout', passport.authenticate('jwt-verify'), (req, res) => {
  loggerWinston.debug('로그아웃')
  req.logout()
  // req.session.destroy(() => {
  return res.status(201).json()
  // })
})

module.exports = router