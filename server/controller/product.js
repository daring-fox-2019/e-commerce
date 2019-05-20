const Products = require('../models/product')
const User = require('../models/user')
var ObjectId = require('mongoose').Types.ObjectId;


class ProductController {

  static getOne(req, res) {
    Products
      .findById(req.params.id)
      .then(product=>{
        res.status(200).json(product)
      })
      .catch(err=>{
        res.status(500).json(err)
      })
  }

  static getList(req, res) {
    Products
      .find()
      .then(product=>{
        res.status(200).json(product)
      })
      .catch(err=>{
        res.status(500).json(err)
      })
  }

  static create(req, res) {
    const { title, description, stock, price } = req.body
    console.log(req.file)
    
    Products
      .create({
        title,
        description,
        stock,
        price,
        image : req.file ? req.file.cloudStoragePublicUrl : 'http://placehold.it/750x300'
      })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  }

  static update(req, res) {
    const { title, description, stock, price } = req.body
    Products
      .findByIdAndUpdate(req.params.id, {
        title,
        description,
        stock,
        price,
        image : req.file ? req.file.cloudStoragePublicUrl : 'http://placehold.it/750x300'
      }, { new: true })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  }

  static delete(req, res) {
    Products
      .findByIdAndDelete(req.params.id)
      .then(product => {
        res.status(200).json(product)
      })
      .catch(err => {
        if (err.name === 'CastError') {
          res.status(400).json({
            error: err,
            message: 'Id not found'
          })
        } else {
          res.status(500).json(err)
        }
      })
  }

  static addToCart(req, res) {
      User
      .findByIdAndUpdate(req.user._id, {
        $push: { carts: req.params.id }
      }, { new: true })

      .then(user => {
        res.status(200).json(user)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  }

  static async removeFromCart(req,res){
    try {
      let user = await User.findById(req.user._id)
      let cart = user.carts.filter( el => el.toString() != req.params.id )
      user.carts = cart
      await user.save()
      console.log(user)
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static getCart(req,res){
    User.findById(req.user._id)
    .populate('carts')
    .then(user=>{
      console.log(user);
      res.status(200).json(user.carts)
    })
    .catch(err=>{
      console.log(err);
    })
  }

}

module.exports = ProductController