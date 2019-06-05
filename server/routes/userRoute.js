const route = require('express').Router()
const { UserController } = require('../controllers')
const { Authentication } = require('../middlewares/authentication')
route.post("/", UserController.create)
route.post('/login', UserController.login)
// route.use(Authentication)
route.get('/one', UserController.readOne)
route.get('/payload', UserController.getPayload)

module.exports = route