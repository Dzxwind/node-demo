var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getAllDataRouter = require('./routes/getAllData')
var getSqliteRouter = require('./routes/getSqlite')

var app = express();
// 设置跨域响应
var allowCrossDomain = function (req, res, next) {
  // 设置请求来源
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  // 设置请求方法
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // 设置请求头
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(allowCrossDomain);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getAllData',getAllDataRouter)
app.use('/getSqlite',getSqliteRouter)

module.exports = app;
