const Cart = require('../models/cart')

class CartController {
    static create(req, res) {
        Cart
            .create({ user: req.decoded._id, product: req.body._id, amount: req.body.amount })
            .then(cart => {
                cart.populate('user').populate('product', err => {
                    res.status(201).json(cart)
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findAll(req, res) {
        Cart.find({ user: req.decoded._id })
            .populate('user')
            .populate('product')
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(err => {
                res.status(500).json(carts)
            })
    }

    static findOne(req, res) {
        Cart.find({ _id: req.params.id })
            .populate('user')
            .populate('product')
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        const { amount } = req.body
        Cart
            .findOneAndUpdate(
                { _id: req.params.id },
                {amount: amount},
                { new: true })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        Cart
            .findOneAndDelete({ _id: req.params.id })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = CartController