const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  tokenGenerator: function(id ,name, email, role) {
    return jwt.sign({id: id, name: name, email: email, role: role}, process.env.SECRET_KEY)    
  },
  
  tokenDecoder: function decode(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}