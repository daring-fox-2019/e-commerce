const Cart = require('../models/cart')
const CartItem = require('../models/cartItem')
const Product = require('../models/product')
const User = require('../models/user')

class CartController {
    static currentCart(req, res) {
        Cart.findOne({
                user: req.user._id,
                status: 'open'
            })
            .populate('user')
            .populate({
                path: 'items',
                populate: {
                    path: 'product',
                    model: 'Product'
                }
            })
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
    static findAll(req, res) {
        Cart.find()
            .populate('user')
            .populate({
                path: 'items',
                populate: {
                    path: 'product',
                    model: 'Product'
                }
            })
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static findOne(req, res) {
        Cart.findOne({
                _id: req.params.id
            })
            .populate('user')
            .populate({
                path: 'items',
                populate: {
                    path: 'product',
                    model: 'Product'
                }
            })
            .then(cart => {
                res.status(200).json(cart)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static addItem(req, res) {
        let cartItem, newCart, cartId
        cartId = req.params.id

        //dummy cart for first time cart by client
        if (cartId === '0') {
            Cart.create({
                user: req.user._id
            })
            .then(function (cart) {
                newCart = cart

                CartItem.create(req.body)
                    .then(function (item) {
                        cartItem = item
                        newCart.totalAmount = item.price;

                        Cart.findOneAndUpdate({
                                _id: newCart._id
                            }, {
                                totalAmount: item.price,
                                $push: {
                                    items: cartItem
                                }
                            }, {
                                new: true
                            })
                            .then(function (result) {
                                res.status(201).json(cartItem)
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json(err.message)
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err.message)
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err.message)
            })
        } else {
            Cart.findOne({
                    _id: cartId,
                    status: 'open'
                })
                .populate('user')
                .populate({
                    path: 'items',
                    populate: {
                        path: 'product',
                        model: 'Product'
                    }
                })
                .then(cart => {
                    if (!cart) { //if current user does not have open cart, create new one first
                        Cart.create({
                                user: req.user._id
                            })
                            .then(function (cart) {
                                newCart = cart
                                CartItem.create(req.body)
                                    .then(function (item) {
                                        cartItem = item
                                        Cart.findOneAndUpdate({
                                                _id: newCart._id
                                            }, {
                                                $inc: {totalAmount: item.price},
                                                $push: {
                                                    items: cartItem
                                                }
                                            }, {
                                                new: true
                                            })
                                            .then(function (result) {
                                                res.status(201).json(cartItem)
                                            })
                                            .catch(err => {
                                                console.log(err);
                                                res.status(500).json(err.message)
                                            })
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(500).json(err.message)
                                    })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json(err.message)
                            })
                    } else { //if current use has existing cart
                        let found = cart.items.find(x => x.product == req.body._id)
                        if (found) {
                            res.status(400).json('Product existed in cart!')
                        } else {
                            CartItem.create(req.body)
                                .then(item => {
                                    cartItem = item

                                    //if current user has cart, add the item to it
                                    Cart.findOneAndUpdate({
                                            _id: cartId
                                        }, {
                                            $inc: {totalAmount: item.price},
                                            $push: {
                                                items: cartItem
                                            }
                                        })
                                        .then(function (result) {
                                            res.status(201).json(cartItem)
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.status(500).json(err.message)
                                        })
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json(err.message)
                                })
                        }
                    }
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        }
    }
    static deleteItem(req, res) {
        let cartId = req.params.id
        let itemId = req.params.itemId

        Cart.findOneAndUpdate({
                _id: cartId,
                status: 'open'
            }, {
                $pull: {
                    items: itemId
                }
            }, {
                new: true
            })
            .then(cart => {
                if (cart) {
                    CartItem.findOneAndDelete({
                            _id: req.params.id
                        })
                        .then((deleted) => {
                            res.status(200).json(deleted)
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json(err.message)
                        })
                } else {
                    res.status(400).json('Invalid Cart')
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err.message)
            })
    }

    static purchase(req, res) {
        Cart.findOneAndUpdate({
            _id: req.params.id
        }, {
            status: 'paid'
        }, {
            new: true
        })
        then(cart => {
                res.status(200).json(cart)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err.message)
            })
    }

    static confirmDelivery(req, res) {
        Cart.findOneAndUpdate({
            _id: req.params.id
        }, {
            status: 'arrived'
        }, {
            new: true
        })
        then(cart => {
                res.status(200).json(cart)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err.message)
            })
    }
}

module.exports = CartController