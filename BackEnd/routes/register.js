module.exports = function (app) {
  app.post('/register', function(req, res) {
    var User = global.dbHelper.getModel('user')
    console.log('body==='+req.body)
    var uname = req.body.username
    var rpassword = req.body.password
    var repassword = req.body.repassword

    console.log('用户注册信息为:'+uname+'...'+rpassword+'...'+repassword)

    User.findOne({
      name: uname
    }, function(error, doc) {
      if(doc) {
        console.log('用户名已经存在')
        res.json({ 'status': 404, 'reason': '用户名已经存在'})
      } else {
        if(repassword !== rpassword) {
          res.json({'status': 500, 'reason': '密码不匹配，用户创建不成功！'})
        } else {
          console.log('创建新用户')
          User.create({
            name: uname,
            password: rpassword
          }, function(error, doc) {
            if(error) {
              console.log('创建不成功'+error)
              res.json({'status': 500, 'reason': '用户创建不成功'})
            } else {
              console.log('创建用户成功！' + doc)
              res.json({ 'status': 200, 'result': '创建用户成功'})
            }
          })

        }
      }
    })
  })
}
