const User         = require('../models/user');
const Product      = require('../models/product');
const { ObjectId } = require('mongoose').Types;

class CartContoller {
    static getCart(req, res, next) {
        User
            .findOne(
                { _id: req.authenticatedUser._id },
                { cart: 1 }
            )
            .populate('cart')
            .then(cart => {
                res
                    .status(200)
                    .json(cart)
            })
            .catch(err => {
                next(err);
            })
    } 

    static addProduct(req, res, next) {
        let arr = [
            User.updateOne(
                { _id: req.authenticatedUser._id },
                { $addToSet: { cart: ObjectId(req.params.productId) } }
            ),
            Product.updateOne(
                { _id: req.params.productId },
                { $inc: { stock: -1 } }
            )
        ]
        User
            .updateOne(
                { _id: req.authenticatedUser._id },
                { $addToSet: { cart: ObjectId(req.params.productId) } }
            )
            .then((result) => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json({
                            message: 'Product added to your cart'
                        })
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Product not found'
                        })
                }
            })
            .catch(err => {
                next(err);
            })
    }

    static removeProduct(req, res, next) {
        User
            .updateOne(
                { _id: req.authenticatedUser._id },
                { $pull: {
                        cart: ObjectId(req.params.productId) 
                    }
                }
            )
            .then(result => {
                if (result.n && result.ok) {
                    res
                        .status(200)
                        .json({
                            message: 'Product removed from your cart'
                        })
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'Product not found'
                        })
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = CartContoller;