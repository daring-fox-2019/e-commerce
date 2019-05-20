const jwt = require('jsonwebtoken')

const createToken = (user) => {
  return jwt.sign({
    _id: user._id,
    email: user.email
  }, process.env.JWT_SECRET_KEY)
}

module.exports = { createToken }
