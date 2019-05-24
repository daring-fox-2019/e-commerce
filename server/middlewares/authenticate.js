const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  console.log(req.headers.token)
  if(req.headers.token){
    req.decoded = jwt.verify(req.headers.token, process.env.KUNCI)
    User.findOne({_id:req.decoded._id})
    .then(user =>{
      if(user) next()
      else res.status(403).json({
        message: 'User not found'
      })
    })
    .catch(err =>{
      res.status(403).json({
        message: 'Authenticate catch'
      })
    })
  }
  else {
    res.status(401).json({
      message: 'login dulu, baru masuk mas'
    })
  }
}