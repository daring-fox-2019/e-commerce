const Model = require('../models/cart')
const Product = require('../models/product')

class Cart {
  static create(req, res) {
    Model.find({ $and: [{ userId: req.userId }, { productId: req.body.productId }, { status: 0 }] })
      .then(data => {
        if (data.length != 0) {
          data = data[0]
          return Product.findById(req.body.productId)
            .then(productFound => {
              let newQuantity = Number(data.quantity) + 1;

              return Model.findOneAndUpdate({ _id: data._id }, { $set: { quantity: newQuantity} }, { new: true })
            })
        } else {
          return Product.findById(req.body.productId)
            .then(data => {
              let newCart = new Model({
                userId: req.userId,
                productId: req.body.productId,
                quantity: 1,
                status: 0,
              })
              return Model.create(newCart)
            })
        }
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static update(req, res) {
    Product.findById(req.body.productId)
      .then(data => {
        return Model.findOneAndUpdate({ _id: req.params.id }, { $set: { quantity: req.body.quantity } }, { useFindAndModify: false , new: true })
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static delete(req, res) {
    Model.findOneAndDelete({ _id: req.params.id })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }

  static findCart(req, res) {
    Model.find({ userId: req.userId })
      .populate('userId')
      .populate('productId')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = Cart