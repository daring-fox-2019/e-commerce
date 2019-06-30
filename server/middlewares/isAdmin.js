const User = require('../models/user')

module.exports = (req, res, next) => {
  User.findById(req.decoded._id)
  .then(row =>{
    console.log(row)
    if(row.role === 'admin'){
      next()
    }
    else{
      res.status(401).json({
        message: 'Admin only'
      })
    }
  })
  .catch(err =>{
    res.status(500).json({
      message: "isAdmin error"
    })
  })
}