const Product = require('../models/product')

class ProductController {
    static create(req,res) {
        const { name, stock, price, image } = req.body;
        const new_product = { name, stock, price, image }
        Product.create(new_product)
        .then(created => {
            res.status(201).json(created)
        })
        .catch(err => {
            let message;
            if(err.errors.stock) {
                message = err.errors.stock.message
            } else if(err.errors.price) {
                message = err.errors.price.message
            } else {
                message = err.message
            }

            res.status(500).json({
                error: 'error when creating new product',
                message,
            })
        })
    }

    static findAll(req,res) {
        Product.find()
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error findone product'
            })
        })
    }

    static findOne(req,res) {
        Product.findOne({_id: req.params.id})
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error di findone product'
            })
        })
    }

    static updateOne(req,res) {
        // console.log(req.params.id)
        // console.log('masuk updateOne')
        // console.log(req.headers)
        let query = {}

        // if(req.headers.add_stock) {
        //     query.$inc =  {stock: req.headers.add_stock}
        // } else if (req.headers.subtract_stock) {
        //     query.$inc =  {stock: -req.headers.subtract_stock}
        // } else {
            const { name, stock, price, image  } = req.body
            query = {name, stock, price, image}
            Object.keys(query).forEach((key) => (query[key] == null) && delete query[key]);
        // }
        
        // console.log(query)

        Product.findOneAndUpdate({_id:req.params.id}, query, {new:true})
        .then(updated => {
            // console.log(updated, '----')
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json({
                error: 'error update product',
                message: err.message
            })
        })
    }

    static updateCartStock(req, res, next) {
        let query = {}
        let conditions = {}

        if(req.body.subtract_stock <= 0) {
            res.status(400).json({
                message:'order quantity must be greater than 0'
            })
        } else {
            if(req.body.add_stock) {
                const { add_stock } = req.body
                conditions = {_id:req.params.id}
                query.$inc =  {stock: add_stock}
                
            } else if (req.body.subtract_stock == 0 || req.body.subtract_stock) {
                if(req.body.subtract_stock > 0) {
                    const { subtract_stock } = req.body
                    conditions = {_id: req.params.id, stock: {$gte: subtract_stock}}
                    query.$inc =  {stock: -subtract_stock}
                } else {
                    console.log('masuk error')
                    throw new Error ('order quantity must be greater than 0')
                }
            }

            Product.findOneAndUpdate(conditions, query, {new:true})
            .then(updated => {
                if(!updated && req.body.add_stock) {
                    res.status(500).json({
                        message: 'adding stock failed',
                        error: 'error when adding stock'
                    })
                } else if(!updated && req.body.subtract_stock) {
                    res.status(500).json({
                        message: 'There is not enough stock',
                        error: 'error when subtracting stock'
                    })
                } else if(updated) {
                    res.status(200).json(updated)
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: 'error update product',
                    message: err.message
                })
            })
        }
    }

    static deleteOne(req,res) {
        Product.findOneAndDelete({_id: req.params.id})
        .then(deleted => {
            console.log('deleted - controller')
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status({
                message: err.message,
                error: 'error deleting product'
            })
        })
    }

}
module.exports = ProductController