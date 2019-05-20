const routes = require('express').Router()

const TransactionController = require('../controllers/Transaction')
const { loggedIn } = require('../middlewares/auth')

routes.get('/', loggedIn, TransactionController.findAll)

module.exports = routes
