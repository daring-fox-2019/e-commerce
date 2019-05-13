// const mongoose = require('mongoose')
const Product = require('../models/product')
// const ObjectId = mongoose.mongo.ObjectId

class ProductController {
  static create(req,res){
    console.log("-------------"+req.body.content)
    Product.create({
      user: req.decoded._id,
      title: req.body.title,
      content: req.body.content,
      // image_url: req.file.cloudStoragePublicUrl,
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
    Product.find({user: req.decoded._id})
    .then(products =>{
      res.status(200).json(products)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to read Todos",
        err
      })
    })
  }
  static search(req,res){
    // console.log("SEARCH",req.decoded)
    let obj = {user: req.decoded._id}
    if(req.query.title) obj.title = { '$regex' : req.query.title, '$options' : 'i' }
    Product.find(obj)
    .then(products=>{
      res.status(200).json(products)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to search Todos",
        err
      })
    })
  }
  static readOne(req,res){
    // let obj = {}
    // if(req.query.bookId) obj.booklist = req.query.bookId

    Product.findOne({
      user: req.decoded._id,
      _id: req.params._id
    })
    .then(product =>{
      res.status(200).json(product)
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to read Todos",
        err
      })
    })
  }
  static update(req,res){
    // Product.findById(ObjectId(req.body.id))
    // .then(result=>{
    //   // if(req.body.status == result.status) req.body.status = result.status
    //   const newcreated_at = new Date(req.body.created_at)
    //   // if(newcreated_at == result.created_at) newcreated_at = result.created_at
    //   return Product.findByIdAndUpdate(ObjectId(req.body.id),{
    //     title: req.body.title,
    //     content: req.body.content,
    //     status: req.body.status,
    //     created_at: newcreated_at,
    //   })
    // })
    Product.findByIdAndUpdate(req.params._id,{
      title: req.body.title,
      content: req.body.content,
      created_at: req.body.created_at,
      // image_url: req.file.cloudStoragePublicUrl,
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