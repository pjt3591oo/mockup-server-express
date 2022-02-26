const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const loggerWinston = require('../../../utils/logger');
const authService = require('../service/index');

const MINUTES = 60000;

exports.MINUTES = MINUTES;

exports.sessionStrategyPassport = () => {
  // Strategy 성공 시 호출 => passport.use에서 done(null)이 호출될 때 호출
  passport.serializeUser((user, done) => { 
    loggerWinston.debug('[SESSION PASSPORT] serialization: req.user 생성')
    loggerWinston.debug(`[SESSION PASSPORT] serialization: 세션유지 시간: ${MINUTES / 1000}초`)
    done(null, user); // 첫 번째 인자는 에러인자, req.user 객체에 저장
  });

  // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
  // 로그인 이후 session 정보를 req.user에 저장하기 위해 호출
  // 만약 로그인을 한적 없다면 호출되지 않는다.
  passport.deserializeUser((user, done) => { 
    loggerWinston.debug('[SESSION PASSPORT] deserialization: req.user 생성')
    done(null, user); // 첫 번째 인자는 에러인자, req.user 객체에 저장
  });

  passport.use('session-base', new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
  }, (req, id, pw, done) => {
    loggerWinston.debug('[SESSION PASSPORT] 인증전략 실행')
    loggerWinston.debug(`ID: ${id}, ${pw}`)
    const user = authService.find(id, pw)
    if (!user) return done(false, null)
    
    return done(null, {
      'uid': `${user.id}-${user.pw}`,
      'expired': new Date().getTime() + MINUTES
    });
  }));
};