const Product = require('../models/product')
const User = require('../models/user')
const Cart = require('../models/cart')

module.exports = {
    check(req, res, next) {
        // console.log('masuk ke check')
        if(req.body.add_item_to_cart) {
            const  product_id  = req.body.add_item_to_cart
            const { quantity } = req.body

            if(quantity !== undefined) {
                Product.findOne({_id:product_id})
                .then(found => {
                    if(found && found.stock >= quantity) {
                        Cart.create({product: product_id, quantity, user: req.decoded._id})
                        .then(created => {
                            req.cart_item_id = created._id
                            next()
                        })
                        .catch(err => {
                            res.status(500).json({
                                message:'error creating new cart item',
                                error: err.message,
                            })
                        })
                        
                    } else {
                        res.status(400).json({
                            message: 'there is not enough stock'
                        })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message: err.message,
                        error: 'error checking product stock --middlewares'
                    })
                })
            } else {
                res.status(400).json({
                    message: 'quantity must be greater than 0'
                })
            }
        } else if (req.body.remove_item_from_cart) {
            // const product_id = req.body.remove_item_from_cart
            // const user_id = req.decoded._id
            const cart_id = req.body.remove_item_from_cart
            // console.log(cart_id)
            // console.log(cart_id, '-----cart id middlewares stock')
            User.findOne({cart: cart_id})
            .then(found => {
                console.log(found, '========')
                
                if(found) next()
                else {
                    res.status(400).json({
                        message: 'please input cart_id that is going to be removed.'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message,
                    error: 'error checking user cart to remove item --middlewares'
                })
            })
        }
    }
}