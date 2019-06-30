const User = require('../models/user')

module.exports = (req, res, next) => {
  User.findOne({
    _id: req.decoded._id
  })
  .then(row =>{
    if(row.cart.filter(produk=>produk.product.equals(req.params._id))){
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