const jwt = require('jsonwebtoken')

const createToken = (user) => {
  return jwt.sign({
    _id: user.id,
    email: user.email
  }, process.env.JWT_SECRET_KEY)
}

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY)

module.exports = { createToken, verifyToken }
