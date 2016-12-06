var express = require('express')
var path = require('path')
var mongoose = require('mongoose')

var bodyParser = require('body-parser')
//var multer = require('multer')
var session = require('session')

var app = express()

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/todolist')

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'secret',
  cookie: {
    maxAge: 1000*60*60
  }
}))

// 定义数据库操作的全局变量
global.dbHelper = require('./common/dbHelper.js')

// 定义中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend: true }))

// 跨域请求问题
app.all('*', function(req, res, next) {
  res.Header('Access-Control-Allow-Origin', '*')
  res.Header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Request-With, yourHeaderField')
  res.Header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET, OPTIONS')

  if(req.method == 'OPTIONS') {
    res.send(200) // 让请求快速返回
  } else {
    next()
  }

})

require('./routes')(app)

app.listen(3000 || process.argv[2])
