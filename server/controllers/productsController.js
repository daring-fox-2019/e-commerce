const Product = require('../models/product')

class ProductController {
    static findAll(req, res) {
        Product.find()
            .then(list => {
                res.status(200).json(list)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
    static findOne(req, res) {
        Product.findOne({_id: req.params.id})
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
    static create(req, res) {
        Product.create({...req.body})
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
    static delete(req, res) {
        Product.delete({_id: req.params.id})
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
    static update(req, res) {
        Product.update({_id: req.params.id}, req.body, {new: true})
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}
module.exports = ProductController