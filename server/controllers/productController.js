const Product = require('../models/productModel')

class ProductController{
    static gets(req, res){
        Product.find({})
            .then(products=>{
                res.status(200).json(products)
            })
            .catch(err=>{
                res.status(500).json({ message: 'Internal server error'})
            })
    }
    static create(req, res){
        let { name, description, price, image_url, category, stock} = req.body
        Product.create({
            name, description, price, image_url, category, stock
        })
        .then(newProduct=>{
            res.status(201).json(newProduct)
        })
        .catch(err=>{
            res.status(500).json({ message: 'Internal server error' })
        })    
    }
    static upload(req, res, next){
        if (req.file && req.file.cloudStoragePublicUrl) {
          return res.send(req.file.cloudStoragePublicUrl);
        }
        return res.status(500).send('Unable to upload');
    }
    static update(req, res){
        let dataUpdate = req.body
        Product.findByIdAndUpdate(req.params.id, dataUpdate, {new: true})
        .then(updated=>{
            res.status(200).json(updated)
        })
        .catch(err=>{
            res.status(500).json({ message: 'Internal server error' })
        })
    }
    static delete(req, res){
        Product.findByIdAndDelete(req.params.id)
        .then(deleted=>{
            res.status(200).json(deleted)
        })
        .catch(err=>{
            res.status(500).json({ message: 'Internal server error' })
        })
    }
    static deleteWhere(req, res){
        Product.deleteMany({
            name: req.params.where
        })
        .then(deleted=>{
            res.status(200).json(deleted)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ProductController