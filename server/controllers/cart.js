const { Cart } = require('../models')

class ControllerCart {
  static create(req, res, next) {
    let { productId } = req.body
    let newCart = {
      user: req.user._id,
      product: productId
    }
    Cart.create(newCart)
      .then(cart => {
        res.status(201).json(cart)
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'ControllerCart.create'})
      })
  }
  static findAll(req, res, next) {
    Cart.find()
      .then(carts => {
        res.status(200).json(carts)
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'ControllerCart.findAll'})
      })
  }
  static findOne(req, res, next) {
    Cart.findOne({_id: req.params.id})
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'ControllerCart.findOne'})
      })
  }
  static findMy(req, res, next) {

  }
  static update(req, res, next) {
    Cart.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
    .then(cart => {
      res.status(200).json(cart)
    })
    .catch(err => {
      next({ status: 500, message: err.message, origin: 'ControllerCart.update'})
    })
  }
  static delete(req, res, next) {
    Cart.findOneAndDelete({_id: req.params.id})
      .then(cart => {
        const response = {
          message: 'Successfully deleted cart.',
          id: req.params.id
        }
        res.status(200).json(response)
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'ControllerCart.delete'})
      })
  }
}

module.exports = ControllerCart