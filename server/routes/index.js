const route = require('express').Router()

route.use('/users', require('./userRoute'))
route.use("/products", require('./productRoute'))
route.use('/carts', require('./cartRoute'))

module.exports = route