const bcrypt = require('bcryptjs')

module.exports = {
  hashSync: function (password) {
    return bcrypt.hashSync (password, 8)
  },
  compareSync: function(password, hash) {
    return bcrypt.compareSync(password, hash)
  }
}