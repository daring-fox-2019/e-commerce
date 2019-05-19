// const mongoose = require('mongoose')
const Product = require('../models/product')
// const ObjectId = mongoose.mongo.ObjectId

class ProductController {
  static create(req,res){
    Product.create({
      name: req.body.name,
      image_url: req.file.cloudStoragePublicUrl,
      price: req.body.price,
      stock: req.body.stock,
    })
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Failed to create new Product",
        err
      })
    })
  }
  static read(req,res){
    // console.log("READ",req.decoded)
    Product.find({})
    .then(products =>{
      res.status(200).json(products)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to read Products",
        err
      })
    })
  }
  static search(req,res){
    // console.log("SEARCH",req.decoded)
    if(req.query.name) obj.name = { '$regex' : req.query.name, '$options' : 'i' }
    Product.find(obj)
    .then(products=>{
      res.status(200).json(products)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to search Products",
        err
      })
    })
  }
  static readOne(req,res){
    // let obj = {}
    // if(req.query.bookId) obj.booklist = req.query.bookId

    Product.findOne({
      _id: req.params._id
    })
    .then(product =>{
      res.status(200).json(product)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to read Products",
        err
      })
    })
  }
  static update(req,res){
    Product.findByIdAndUpdate(req.params._id,{
      name: req.body.name,
      image_url: req.file.cloudStoragePublicUrl,
      price: req.body.price,
      stock: req.body.stock,
      updated_at: new Date(),
    })
    .then(result=>{
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to update Product",
        err
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
        message: "Failed to delete Product",
        err
      })
    })
  }
}

module.exports = ProductController