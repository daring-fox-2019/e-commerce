const { Cart } = require("../models");
const {
  hashPass,
  generateJWT,
  compareHash,
  decodeJWT
} = require("../helpers/helper");

class CartController {
  static create(req, res) {
    let decode = decodeJWT(req.headers.token);
    Cart.findOne({userId: decode.id, productId: req.body.productId})
    .populate('productId')
    .then(cart=>{
      if (cart && cart.productId.stock > cart.quantity){
        Cart.findOneAndUpdate(
          {
            _id: cart._id
          },
          {
            quantity: cart.quantity + 1
          },
          { new: true }
        )
          .then(updated => {
            res.status(200).json(updated);
          })
          .catch(err => {
            res.status(500).json({
              msg: err.message
            });
          });
      }else{
        let newCart = new Cart({
          userId: decode.id,
          productId: req.body.productId,
          quantity: 1,
          checked: 0
        });
        newCart
          .save()
          .then(cart => {
            res.status(201).json(cart);
          })
          .catch(err => {
            res.status(500).json({
              msg: err.message
            });
          });
      }
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
   
  }
  static readOwned(req, res) {
    let decode = decodeJWT(req.headers.token);
    Cart.find({ userId: decode.id, checked : 0})
      .populate("productId")
      .then(carts => {
        res.status(200).json(carts);
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        });
      });
  }
  static updateQuantity(req, res) {
    Cart.findOneAndUpdate(
      {
        _id: req.body.id
      },
      {
        quantity: req.body.qty
      },
      { new: true }
    )
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json({
          msg: err.message
        });
      });
  }
  static deleteCart(req,res){
    if(!req.query.id){
      res.status(400).json({
        msg: 'cart id must be provided!'
      })
    }else{
      Cart.findByIdAndDelete(req.query.id)
      .then(deleted=>{
        res.status(200).json(deleted)
      })
      .catch(err=>{
        res.status(500).json({
          msg: err.message
        })
      })
    }
  }
  static checkOut(req,res){
    let decode = decodeJWT(req.headers.token)
    Cart.deleteMany({userId: decode.id})
    .then(deleted=>{
      res.status(200).json(deleted)
    })
    .catch(err=>{
      res.status(500).json({
        msg: err.message
      })
    })
  }
  
}

module.exports = CartController;
