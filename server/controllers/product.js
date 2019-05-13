const { Product, User } = require('../models')

class ControllerProduct {
  static create(req, res, next) {
    let { name, description, featuredImg, price, stock, tags } = req.body
    let newProduct = {
      name, description, featuredImg, price, stock, tags
    }
    Product.create(newProduct)
      .then(product => {
        res.status(201).json(product)
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'ControllerProduct.create'})
      })
  }
  static findAll(req, res, next) {
    Product.find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'ControllerProduct.findAll'})
      })
  }
  static findOne(req, res, next) {
    Product.findOne({_id: req.params.productId})
      .then(product => {
        res.status(200).json(product)
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'ControllerProduct.findOne'})
      })
  }
  static update(req, res, next) {
    Product.findOneAndUpdate({_id: req.params.productId}, req.body, { new: true })
    .then(product => {
      res.status(200).json(product)
    })
    .catch(err => {
      next({ status: 500, message: err.message, origin: 'ControllerProduct.update'})
    })
  }
  static delete(req, res, next) {
    Product.findOneAndDelete({_id: req.params.productId})
      .then(product => {
        const response = {
          message: 'Successfully deleted product.',
          id: req.params.productId
        }
        res.status(200).json(response)
      })
      .catch(err => {
        next({ status: 500, message: err.message, origin: 'ControllerProduct.delete'})
      })
  }
}

module.exports = ControllerProduct