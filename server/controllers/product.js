const { Product, User } = require('../models')

class ControllerProduct {
  static create(req, res, next) {
    let { name, description, featuredImg, price, stock, tags, shortkey } = req.body
    // featuredImg = req.cloudStoragePublicUrl
    let newProduct = {
      name, description, featuredImg, price, stock, tags
    }
    if(shortkey) {
      newProduct.shortkey = shortkey
    }
    if(price > 0) {
      newProduct.priceStr = 'Rp ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else {
      newProduct.priceStr = 'Free To Play'
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