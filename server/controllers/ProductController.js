const Product = require('../models/product')

class ProductController {
    static findAll(req, res) {
        Product
            .find()
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findOne(req, res) {
        Product
            .findOne({ _id: req.params.id })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        let imageUpload = req.file.cloudStoragePublicUrl
        const { name, description, price, stock, category } = req.body
        Product
            .create({ name, description, price, image: imageUpload, stock, category })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        let { name, description, price, stock, category } = req.body
        let toChange = { name, description, price, stock, category }
        if (req.file) toChange.image = req.file.cloudStoragePublicUrl
        Product
            .findOneAndUpdate(
                { _id: req.params.id },
                toChange,
                { new: true })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(200).json(err)
            })
    }

    static delete(req, res) {
        Product
            .findOneAndDelete({ _id: req.params.id })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ProductController