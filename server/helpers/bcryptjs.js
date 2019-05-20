const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

module.exports = {
    hash : function(password) {
        return bcrypt.hashSync(password,salt)
    },
    compare : function(password,hash) {
        return bcrypt.compareSync(password,hash)
    }
}