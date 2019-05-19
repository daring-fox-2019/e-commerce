const { decodeJWT } = require("../helpers/helper");
const { User, Product, Cart } = require("../models");

module.exports = {
  Authentication: function(req, res, next) {
    console.log("authenticating")
    let decode = decodeJWT(req.headers.token);
    if (decode) {
      User.findOne({ email: decode.email })
        .then(user => {
          if (user) {
            next();
          } else {
            res.status(404).json({
              msg: "Email not found"
            });
          }
        })
        .catch(err => {
          res.status(500).json({
            msg: err.message
          });
        });
    } else {
      res.status(400).json({
        msg: "Token is not valid"
      });
    }
  },
  ProductAuthorization: function(req,res,next){
    let decode = decodeJWT(req.headers.token)
    Product.findOne({_id: req.params.id})
    .then(product=>{
      if (product.sellerId == decode.id){
        next()
      }else{
        res.status(401).json({
          msg: "Not authorized"
        })
      }
    })
  },
  CartAuthorization: function(req,res,next){
    let decode = decodeJWT(req.headers.token)
    Cart.findOne({_id: req.query.id})
    .then(cart=>{
      if (cart.userId == decode.id){
        next()
      }else{
        res.status(401).json({
          msg: "Not authorized"
        })
      }
    })
  }
};