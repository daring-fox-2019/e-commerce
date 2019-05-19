const Model = require('../models/transaction')
const modelCart = require('../models/cart')
const modelProduct = require("../models/product")

class Product {
  static findAll(req, res) {
    Model.find()
      .populate('cart')
      .populate('userId')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findAllUser(req, res) {
    Model.find({ userId: req.userId })
      .populate('cart')
      .populate('userId')
      .then(data => {
        modelProduct.populate(data,{
          path: 'cart.productId',
          select: 'name'
        })
        .then(dat=>{
          console.log(data);
        })
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static create(req, res) {
    let newData = null
    let newTransaction = new Model({
      userId: req.userId,
      cart: req.body.cart,
      totalPrice: req.body.totalPrice,
      status: 0
    })
    Model.create(newTransaction)
      .then(data => {
        newData = data

        return modelCart.updateMany({ userId: req.userId }, { $set: { status: true } })
      })
      .then(data => {
        res.status(201).json(newData)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findOne(req, res) {
    Model.findById(req.params.id)
      .populate('cart')
      .populate('userId')
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
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static update(req, res) {
    Model.findOneAndUpdate({ _id: req.params.id }, { $set: { status: req.body.status } }, { useFindAndModify: false, new: true })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = Product