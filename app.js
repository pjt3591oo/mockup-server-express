const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const loggerWinston = require('./utils/logger');
const cors = require('cors');

const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const statusRouter = require('./routes/status');
const newsRouter = require('./routes/news');
const authRouter = require('./routes/auth');
const fileRouter = require('./routes/file');

const {
  rpc, jsonrpc
} = require('./other');

const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

// 미들웨어
app.use('/', (req, res, next) => {
  // loggerWinston.debug('[middleware] 미들웨어');
  // loggerWinston.info(req.headers);
  // loggerWinston.info('info 메시지');
  // loggerWinston.error('error 메시지');
  // loggerWinston.warn('warn 메시지');
  // loggerWinston.http('http 메시지'); 
  // loggerWinston.debug('debug 메시지');

  next();
})

jsonrpc(app);
rpc(app);

app.use('/book', booksRouter);
app.use('/user', usersRouter);
app.use('/news', newsRouter);
app.use('/auth', authRouter);
app.use('/file', fileRouter);
app.use('/status', statusRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('[middleware] catch 404 and forward to error handler');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
