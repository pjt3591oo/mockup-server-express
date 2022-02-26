const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const jwt = require('jsonwebtoken');

const loggerWinston = require('../../../utils/logger');
const authService = require('../service/index');


const SECRET_KEY = 'asdfsadfsadfafsd';

exports.SECRET_KEY = SECRET_KEY;

exports.jwtCreateStrategyPassport = () => {
  passport.serializeUser((user, done) => { 
    const token = jwt.sign(user, SECRET_KEY)
    loggerWinston.debug(`[jwt PASSPORT] serialization: JWT Token 생성: ${token}`)
    console.log(user)
    done(null, token); 
  });

  passport.use('jwt-create', new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다.
  }, (req, id, pw, done) => {
    const user = authService.find(id, pw)
    loggerWinston.debug('[jwt PASSPORT] JWT 생성을 위한 사용자 검사')
    if (!user) return done(false, null)
    
    return done(null, {
      id: user.id,
      pw: user.pw,
      name: user.name
    });
  }))
}

exports.jwtVerifyStrategyPassport = () => {
  passport.use('jwt-verify', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
    passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다.
  }, function (req, jwtPayload, done) {
    loggerWinston.debug('[jwt PASSPORT] JWT 검증')
    
    const {id, pw, name, iat} = jwtPayload;
    loggerWinston.debug(`decode TOKEN id: ${id}, pw: ${pw}, name: ${name}, iat: ${iat}`)
    const user = authService.find(id, pw)
    if (!user) return done(false, null)
    
    return done(null, {
      id: user.id,
      pw: user.pw,
      name: user.name
    });
  }));
};