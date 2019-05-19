const jwt = require('jsonwebtoken')

module.exports = {
  generateToken: function (data) {
    let x = jwt.sign(data, 'shhhhh')
    return x
  },
  verifyToken: function (token) {
    var decoded = jwt.verify(token, 'shhhhh');
    return decoded
  }
}