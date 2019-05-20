const jwt = require('jsonwebtoken')

module.exports = {
    sign: function (payload) {
        return jwt.sign(payload, process.env.SECRET, { expiresIn: '1 day' })
    },
    verify: function (token) {
        return jwt.verify(token, process.env.SECRET)
    }
}