module.exports = function(app) {
  app.post('/searchAll', function(req,res) {
    var dbUser = global.dbHelper.getModel('user')
    var dbItems = global.dbHelper.getModel('todoItems')

    var userId = req.body.userId

    dbUser.findOne({
      _id: userId
    }, function(error, doc) {
      console.log('查询的用户信息:'+doc)
      if(error) {
        res.json({'status': 404, 'reason': '事件查询出错！'})
      } else {
        if(!doc) {
          res.json({'status': 404, 'reason': '事件查询出错！'})
        } else {
          dbItems.find({
            userId: userId,
            isDel: false
          }, {
            'userId':0,
            'isDel': 0,
            'time': 0,
            '__v':0
          }, function(error, docs) {
            console.log(userId+'用户数据：'+docs)
            if(error) {
              res.json({'status': 404, 'reason': '事件查询出错！'})
            } else {
              res.json(docs)
            }
          })
        }
      }
    })
  })

  app.post('/searchOne',function(req,res) {
    var dbUser = global.dbHelper.getModel('user')
    var dbItems = global.dbHelper.getModel('todoItems')

    var userId = req.body.userId
    var itemId = req.body.itemId

    dbUser.findOne({
      _id: userId
    }, function(error, doc) {
      console.log('查询的用户信息:'+doc)
      if(error) {
        res.json({'status': 404, 'reason': '事件查询出错！'})
      } else {
        if(!doc) {
          res.json({'status': 404, 'reason': '事件查询出错！'})
        } else {
          dbItems.findOne({
            userId: userId,
            _id: itemId,
            isDel: false
          }, {
            'isDel': 0,
            '__v':0
          }, function(error, doc) {
            console.log(userId+'用户数据：'+doc)
            if(error) {
              res.json({'status': 404, 'reason': '事件查询出错！'})
            } else {
              res.json(doc)
            }
          })
        }
      }
    })
  })
}
