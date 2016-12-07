module.exports = function(app) {
  app.post('/login', function(req, res) {
    var User = global.dbHelper.getModel('user')
    var username = req.body.username

    console.log(req.body.username+'...'+req.body.password)

    User.findOne({
      name: username
    }, function(error, doc) {
      console.log('查询的用户信息:'+doc)
      if(error) {
        console.log('未获取用户信息')
        res.json({ 'status': 404, 'reason': '用户不存在'})
      } else {
        console.log('获取的用户密码为:'+doc.password)
        if(doc.password !== req.body.password) {
          console.log('密码错误!')
          res.json({ 'status': 404, 'reason': '用户名密码不匹配!'})
        } else {
          console.log('登陆成功')
          res.json({'status' : 200, 'result':'用户登陆成功!', 'userId': doc._id})
        }
      }
    })
  })
}
