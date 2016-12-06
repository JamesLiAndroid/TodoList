module.exports = function(app) {
  require('./login')(app)
  require('./register')(app)
}
