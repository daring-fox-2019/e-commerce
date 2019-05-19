const Cart = require('../models/cart')

module.exports = function(req, res, next) {
    let id

    if(req.user.role === 'admin') {
        next()
    }
    else {
        id = req.params.id
        Cart.findOne({_id: id})
            .then(cart => {
                if(cart) {
                    if(cart.user === req.user._id) {
                        next()
                    }
                    else {
                        res.status(403).json(`Forbidden to access the resource`)
                    }
                }
                else {
                    res.status(400).json(`Invalid ID`)
                }
            })
            .catch(err => {
                console.log('authorizeCart error ==> ',err);
                res.status(500).json(`Error during authorization. Please try again.`)
            })
        
    }
}