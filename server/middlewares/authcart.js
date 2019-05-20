const Cart = require('../models/cart')
console.log('pake middleware cart auth');

module.exports = {
    authcart : async function (req, res, next) {
        try {
            let cartId = req.headers.cartid
            let userId = req.authenticatedUser.id
            // console.log('apasih', cartId, userId, 'LALALAAL');
            
            let found = await Cart.findById(cartId)
            if (!found) {
              res.status(404).json({message: 'Not found'})
            } else {
                if (found.userId == userId) next()
                else {
                    res.status(401).json({message : 'Not authorzied to conduct action'})
                }
            }
        } catch (error) {     
            res.status(500).json(error)
        }

    }
}