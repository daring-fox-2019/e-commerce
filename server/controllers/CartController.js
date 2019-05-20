const Cart = require('../models/cart')
const Helper =require('../helpers/helper')

class CartController {
    static create(req, res) {
        const user = Helper.verifyJWT(req.headers.token)
        const {total,quantity} = req.body

        Cart
        .create({
            product: req.params.id,
            buyer: user.id,
            quantity,
            total
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

    static delete(req, res) {
        const id = req.params.id

        Cart
        .findByIdAndDelete(id)
        .then(cart=> {
            res.status(202).json(cart)
        })
        .catch(err => {
            res.status(400).json({msg: err})
        })
    }

    static deleteByUser(req, res) {
        const id = req.params.id
        const user = Helper.verifyJWT(req.headers.token)

        Cart
        .deleteMany({buyer:user.id})
        .then(cart=> {

            res.status(202).json(cart)
        })
        .catch(err => {
            res.status(400).json({msg: err})
        })
    }
}

module.exports = CartController
