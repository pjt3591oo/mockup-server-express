const express = require('express')
const passport = require('passport')
const session = require('express-session'); 

const sessionRouter = require('./session');
const jwtRouter = require('./jwt');

const {sessionStrategyPassport, MINUTES} = require('./strategy/session');
const {jwtVerifyStrategyPassport, jwtCreateStrategyPassport} = require('./strategy/jwt');

const router = express.Router()

// session middleware stack 설정
router.use('/session', 
  session({ 
    secret: 'mung key', 
    resave: true, 
    saveUninitialized: false,
    cookie:{ expires : new Date(Date.now() + MINUTES)},
  }), // 세션 설정
  passport.initialize(),  // passport 초기화
  passport.session(),     // session base passport 설정
  (req, res, next) => {
    sessionStrategyPassport()
    next()
  }, // passport 전략등록
  sessionRouter // API
)

router.use('/jwt', 
  passport.initialize(),  // passport 초기화
  (req, res, next) => {
    jwtCreateStrategyPassport();
    jwtVerifyStrategyPassport();
    next()
  }, // passport 전략등록
  jwtRouter // API
)

module.exports = router;