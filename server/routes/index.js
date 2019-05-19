const express = require('express');
const routes = express.Router();
const admin = require('./admin')
const users = require('./users')
const products = require('./products')
const carts = require('./carts')
const Authentication = require('../middlewares/authentication')

routes.use('/users', users)
routes.use('/admin', admin)
routes.use('/products', products)
routes.use('/carts', Authentication, carts)

routes.get('*', (req,res) => {
    res.send('404 page not found')
})

module.exports = routes