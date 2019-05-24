const Product = require('../models/product')

class ProductController{
    
    static getAll(req,res){
        console.log('masuk get');
        
        Product
        .find({})
        .then(products =>{
            res.status(200).json(products)
        })
        .catch(err =>{
            res.status(500).json({
                message: 'internal server error'
            })
        })
    }

    static getOne(req,res){
        // console.log('id nya',req.params.id);
        Product
        .findOne( {_id : req.params.id})
        .then(product =>{
            res.status(200).json(product)
        })
        .catch(err=>{
            res.status(500).json({
                message : 'internal server error'
            })
        })
    }

    static create(req,res){
        console.log('masuk sini',req.body);
        Product
        .create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.file.cloudStoragePublicUrl,
            location: req.body.location,
            stock: req.body.stock
        })
        .then(product =>{
            res.status(201).json(product)
        })
        .catch(err =>{
            res.status(500).json({
                message : 'Internal server error'
            })
        })
    }

    static delete(req,res){
        Product
        .findOneAndDelete({_id : req.params.id})
        .then(product =>{
            res.status(201).json(product)
        })
        .catch(err=>{
            res.status(500).json({
                message : 'internal server error'
            })
        })
    }

    static update(req,res){
        Product
        .findOneAndUpdate({_id : req.params.id},{$set : {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            location : req.body.location
        }}, {new : true})
        .then(product =>{
            res.status(201).json(product)
        })
        .catch(err =>{
            res.status(500).json({
                message : 'Internal server error'
            })
        })
    }
}

module.exports = ProductController