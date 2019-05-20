const route = require('express').Router()
const cartController = require('../../controllers/cartController')
const authenticate = require('../../middlewares/authenticate')
const isThatUser = require('../../middlewares/isThatUser')

// route.get('/',(req,res) => {
//     res.send('masuk di route cart')
// })

route.use(authenticate)
route.use(isThatUser)
route.get('/', cartController.findOne)
// route.post('/', cartController.create)
// route.delete('/:CartId', cartController.delete)
route.patch('/addToCart', cartController.addToCart)
// route.patch('/addQuantity', cartController.addQuantity)
// route.patch('/subtractQuantity', cartController.subtractQuantity)
route.patch('/removeProduct', cartController.removeCart)
route.patch('/removeCart', cartController.removeCartUser)
// route.patch('/checkout', cartController.checkout)

module.exports = route