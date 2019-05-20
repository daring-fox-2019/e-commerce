const express = require('express');
const routes = express.Router();
const TransactionController = require('../controllers/TransactionController')
const Authentication = require('../middlewares/authentication')

routes.get('/', Authentication, TransactionController.findAll)
routes.get('/all', Authentication, TransactionController.findAllOrders)
routes.post('/', Authentication, TransactionController.create)
routes.patch('/paid', Authentication, TransactionController.changeStatusToPaid)
routes.patch('/delivered', Authentication, TransactionController.changeStatusToDelivered)

module.exports = routes