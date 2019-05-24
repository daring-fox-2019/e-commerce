const Product = require('../models/product')

class ProductController {
  static create(req,res){
    let newProduct = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
    }
    if (req.file) {
      newProduct.image_url = req.file.cloudStoragePublicUrl
    }
    Product.create(newProduct)
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  }
  static read(req,res){
    Product.find({})
    .populate('cart.product')
    .then(products =>{
      res.status(200).json(products)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  }
  static search(req,res){
    let obj = {}
    if(req.query.name) 
      obj.name = { '$regex' : req.query.name, '$options' : 'i' }
    if(req.query.category)
      obj.category = req.query.category
    console.log(obj)
    Product.find(obj)
    .populate('cart.product')
    .then(products=>{
      console.log(products)
      res.status(200).json(products)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  }
  static readOne(req,res){
    Product.findOne({
      _id: req.params._id
    })
    .then(product =>{
      res.status(200).json(product)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  }
  static update(req,res){
    let { title, description, price, stock, category } = req.body
    let updated = { title, description, price, stock, category }
    for(let key in updated)
      if(!updated[key])
        delete updated[key]
    if (req.file) {
      updated.image_url = req.file.cloudStoragePublicUrl
    }
    Product.findByIdAndUpdate(req.params._id,updated)
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  }
  static delete(req,res){
    Product.deleteOne({_id: req.params._id})
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    })
  }
}

module.exports = ProductController