const Product = require('../models/product')
const { ObjectId } = require('mongoose')

class ProductController {
  static create(req, res) {
    let { name, images, description, price, seller } = req.body
    let newProduct = {
      name, images, description, price, seller
    }
    Product.create(newProduct)
      .then(({ data }) => {
        res.status(201).json(data)
      })
      .catch(err => res.status(500).json({ message: err.message }))
  }
  static findAll(req, res) {
    Product
    .find({})
    .then(products => {
      res.status(200).json(products)
    })
    .catch(err => {
      res.status(500).json({
        msg : 'Internal server error'
      })
    })
  }
  static findOne(req, res) {
    Product
    .findById(req.params.id)
    .then(product => {
      res.status(200).json(product)
    })
    .catch(err => {
      res.status(500).json({
        msg : 'Internal server error'
      })
    })
  }
  static update(req, res) {
    let { name, images, description, price, seller } = req.body
    let option = {
      name, images, description, price, seller
    }
    Product.findByIdAndUpdate(req.params.id, {$set : option})
    // Product.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(value => {
        res.status(200).json(value)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ 
          msg : 'Internal server error' 
        })
      })
  }
  static delete(req, res) {
    Product.findOneAndDelete({ _id: req.params.id })
      .then(value => {
        console.log(value)
        const response = {
          message: 'Successfully deleted product.',
          id: req.params.id
        }
        res.status(200).json(response)
      })
      .catch(err => { 
        res.status(500).json({ 
          msg : 'Internal server error'
        }) })
  }
}

module.exports = ProductController