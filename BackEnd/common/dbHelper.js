var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  models = require('./models')

for(var m in models) {
  console.log(m+'数据库表')
  mongoose.model(m, new Schema(models[m]))
}

var _getModel = function(type) {
  return mongoose.model(type)
}

module.exports = {
  init: function() {
    for(var m in models) {
      mongoose.model(m, new Schema(models[m]))
    }
  },
  getModel: function(type) {
    return _getModel(type)
  }
}
