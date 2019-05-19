const Product = require('../model/product')
const User = require('../model/user')

module.exports = {
    addNewProduct: function (req, res, next) {
        console.log('ciciw')
        let obj = req.body
        let item = obj.item
        let price = obj.price
        let stock = obj.stock
        let img = obj.img
        let description = obj.description
        let owner = req.body.userId
        if (!img) {
            img = 'https://storage.cloud.google.com/jualeun-qfs/productPhoto/defaultProduct.jpg?_ga=2.75994192.-415458887.1554453586'
        }
        Product.create({
                item,
                price,
                stock,
                img,
                description,
                owner
            })
            .then(newProduct => {
                console.log(newProduct, 'lokokok')
                res.status(201).json(newProduct)
            })
            .catch(err => {
                next(err)
            })
    },
    showAllProducts: function (req, res, next) {
        Product.find()
            .then(allProducts => {
                res.status(200).json(allProducts)
            })
            .catch(err => {
                next(err)
            })
    },
    updateProduct: function (req, res, next) {
        let id = req.params.id
        let obj = req.body
        let item = obj.item
        let price = obj.price
        let stock = obj.stock
        let img = obj.img
        let description = obj.description
        let owner = req.body.userId
        if (!img) {
            Product.updateOne({
                    _id: id
                }, {
                    item,
                    price,
                    stock,
                    description,
                    owner
                })
                .then(updatedProduct => {
                    res.status(201).json(updatedProduct)
                })
                .catch(err => {
                    next(err)
                })
        } else {
            Product.updateOne({
                    _id: id
                }, {
                    item,
                    price,
                    stock,
                    img,
                    description,
                    owner
                })
                .then(updatedProduct => {
                    res.status(201).json(updatedProduct)
                })
                .catch(err => {
                    next(err)
                })
        }
    },
    deleteProduct: function (req, res, next) {
        let id = req.params.id
        Product.deleteOne({
                _id: id
            })
            .then(deletedProduct => {
                res.status(200).json(deletedProduct)
            })
            .catch(err => [
                next(err)
            ])
    },
    reduceStock: function (req, res, next) {
        let id = req.params.id
        let stock = req.body.stock
        stock = Number(stock) - 1
        Product.updateOne({
                _id: id
            }, {
                stock
            })
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                next(err)
            })
    }
}