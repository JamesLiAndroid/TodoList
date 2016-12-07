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
        console.log('查询的用户信息为：'+doc)
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
    var dbItems = global.dbHelper.getModel('todoItems')
    var dbUser = global.dbHelper.getModel('user')

    var userId = req.body.userId
    var newContent = req.body.newContent
    var itemId = req.body.itemId

    dbUser.findOne({
      _id: userId
    }, function(error, doc) {
      if(error) {
        res.json({'status': 404, 'reason': '未获取用户信息'})
      } else {
        if(!doc) {
          res.json({'status': 404, 'reason': '未获取用户信息'})
        } else {
          dbItems.update({
            _id: itemId
          }, {
            $set: {
              content: newContent
            }
          }, function(error) {
            if(error) {
              res.json({ 'status': 404, 'reason': '数据更新不成功' })
            } else {
              res.json({ 'status': 200, 'result': '数据更新完毕！'})
            }
          })
        }
      }

    })
  })
}
