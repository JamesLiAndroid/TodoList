module.exports = function(app) {
  require('./login')(app)
  require('./register')(app)
  //require('./search')(app)
  require('./todolist')(app)
}
