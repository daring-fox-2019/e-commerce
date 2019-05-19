const Cart = require('../models/cart')
const Helper =require('../helpers/helper')

class CartController {
    static create(req, res) {
        const user = Helper.verifyJWT(req.headers.token)
        const {name,quantity} = req.body

        Cart
        .create({
            name,
            buyer: user.id,
            quantity 
        })
        .then(cart=> {
            res.status(200).json(cart)
        })
        .catch(err=> {
            res.status(400).json({msg: err})
        })
    }

    static findAll(req, res) {
        const user = Helper.verifyJWT(req.headers.token)

        Cart
        .find({
            buyer: user.id
        })
        .populate('buyer', 'name')
        .populate('product')
        .then(cart=> {
            res.status(200).json(cart)
        })
        .catch(err=> {
            res.status(400).json({msg: err})
        })
    }
}

module.exports = CartController
