const Cart = require('../models/cart');

module.exports = (req, res, next) => {
    Cart.findOne({ _id: req.params.id })
        .then(cart => {
            if (cart.user.toString() === req.decoded._id.toString()) {
                next()
            }
            else {
                res.status(403).json({ err: "Forbidden" })
            }
        })
        .catch(err => {
            res.status(401).json(err)
        })
}