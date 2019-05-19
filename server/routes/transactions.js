const express = require('express');
const routes = express.Router();
const TransactionController = require('../controllers/TransactionController')
const Authentication = require('../middlewares/authentication')

routes.get('/', Authentication, TransactionController.findAll)
routes.post('/', Authentication, TransactionController.create)

module.exports = routes