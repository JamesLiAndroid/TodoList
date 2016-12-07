module.exports = function(app) {
  app.post('/addItem', function(req,res) {
    var dbItems = global.dbHelper.getModel('todoItems')
    var dbUser = global.dbHelper.getModel('user')

    var userId = req.body.userId
    var content = req.body.content
    var time = req.body.time

    dbUser.findOne({
      _id: userId
    }, function(error, doc) {
      if(error) {
        res.json({ 'status': 404, 'reason': '用户未找到！'})
      } else {
        if(doc) {

      dbItems.create({
        userId: userId,
        content: content,
        time: time
      }, function(error, doc) {
        console.log('插入的记事数据条目为：'+doc)
        if(error) {
          res.json({ 'status': 404, 'reason': '插入数据失败！'})
        } else {
          if(doc) {
            res.json({'status': 200, 'result': '插入数据成功！'})
          } else {
            res.json({ 'status': 404, 'result': '插入数据失败！' })
          }
        }
        })

        } else {
          res.json({ 'status': 404, 'reason': '用户未找到！'})
        }
      }
    })
  })
  app.post('/changeContent', function(req,res){

  })
}
