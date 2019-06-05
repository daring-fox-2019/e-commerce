const route = require("express").Router();
const { CartController } = require("../controllers");
const { Authentication, CartAuthorization } = require("../middlewares/authentication");

route.use(Authentication)
route.post('/', CartController.create)
route.get('/owned', CartController.readOwned)
route.patch('/qty', CartController.updateQuantity)
route.delete('/', CartAuthorization ,CartController.deleteCart)
route.delete('/checkout', CartController.checkOut)
module.exports = route