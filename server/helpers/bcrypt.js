const bcrypt = require('bcryptjs')

module.exports = {
    generateHash : function(pass){
        return bcrypt.hashSync(pass,8)
    },
    verifyPass : function(pass,hash){
        return bcrypt.compareSync(pass,hash)
    }
}