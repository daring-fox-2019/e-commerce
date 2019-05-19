const Cart = require('../model/cart')
const Product = require('../model/product')

module.exports = {
    addNewCart: function (req, res, next) {
        let name = req.body.name
        let owner = req.body.owner
        Cart.create({
                name,
                owner
            })
            .then(newCart => {
                res.status(201).json(newCart)
            })
            .catch(err => {
                next(err)
            })
    },
    deleteCart: function (req, res, next) {
        let id = req.params.id
        Cart.findOne({
                _id: id
            })
            .then(data => {
                for (let i = 0; i < data.products.length; i++) {
                    Product.updateOne({
                            _id: data.products[i]
                        }, {
                            $inc: {
                                stock: 1
                            }
                        })
                        .then(data => {
                            console.log('berhasil balikan stok item sebelum addtocart')
                        })
                        .catch(er => {
                            console.log(err)
                        })
                }
                return Cart.deleteOne({
                        _id: id
                    })
                    .then(deletedCart => {
                        console.log('siapa duluan')
                        res.status(200).json(deletedCart)
                    })
            })
            .catch(err => {
                next(err)
            })
    },
    showCarts: function (req, res, next) {
        let userId = req.body.userId
        Cart.find({
                owner: userId,
                checkout: false
            }).populate('products')
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(err => {
                next(err)
            })
    },
    updateCart: function (req, res, next) {
        let id = req.params.id
        let name = req.body.name || (new Date).toLocaleDateString() + " " + (new Date).toLocaleTimeString()
        let owner = req.body.userId
        let productId = req.body.productId
        Cart.updateOne({
                _id: id,
                checkout: false
            }, {
                name,
                owner,
                $push: {
                    products: productId
                }
            })
            .then(updatedCart => {
                res.status(201).json(updatedCart)
            })
            .catch(err => {
                next(err)
            })
    },
    checkoutCart: function (req, res, next) {
        let id = req.params.id
        let name = (new Date).toLocaleDateString() + " " + (new Date).toLocaleTimeString()
        Cart.updateOne({
                _id: id
            }, {
                name,
                checkout: true
            })
            .then(updatedCart => {
                res.status(201).json(updatedCart)
            })
            .catch(err => {
                next(err)
            })
    },
    deliveredCart: function (req, res, next) {
        let id = req.params.id
        let name = (new Date).toLocaleDateString() + " " + (new Date).toLocaleTimeString()
        Cart.updateOne({
                _id: id
            }, {
                name,
                delivered: true
            }).populate('products')
            .then(updatedCart => {
                res.status(201).json(updatedCart)
            })
            .catch(err => {
                next(err)
            })
    },
    getDeliveryStatus(req, res, next) {
        Cart.find({
                owner: req.body.userId,
                delivered: false,
                checkout: true
            }).populate('products')
            .then(foundCarts => {
                res.status(200).json(foundCarts)
            })
            .catch(err => {
                next(err)
            })
    },
    showAllCarts(req, res, next) {
        Cart.find({}).populate('products').populate('owner')
            .then(foundCarts => {
                res.status(200).json(foundCarts)
            })
            .catch(err => {
                next(err)
            })
    }

}