const Product = require('../models/product')

module.exports = (req, res, next) => {
  // console.log("Authorize",req.decoded._id)
  Product.findOne({_id: req.params._id})
  .then(row =>{
    if(row.user.equals(req.decoded._id)){
      next()
    }
    else{
      res.status(401).json({
        message: 'Not Authorized'
      })
    }
  })
  .catch(err =>{
    res.status(400).json({
      message: "Product gak ketemu"
    })
  })
}