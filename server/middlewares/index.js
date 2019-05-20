let jwt = require('jsonwebtoken')
let Product = require('../models/product')
let User = require('../models/user')

let middlewares = {
  isUser: function (req, res, next) {
    console.log(`masuk middleware`);
    let token = req.headers.token
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        res.status(400).json({ message: 'invalid token' })
      } else {
        req.user = decoded
        next()
      }
    });
  },
  isAuthorize: function (req, res, next) {
    let token = req.headers.token
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (decoded.role === 'admin') {
        next()
      } else {
        res.status(401).json({ errors: 'Only admin can modify products' })
      }
    })
  }


}

module.exports = middlewares