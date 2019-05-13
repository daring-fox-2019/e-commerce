const route = require('express').Router()
const authCtrl = require('../controllers/authController')

route.post('/register', authCtrl.signup)
route.post('/login', authCtrl.signin)
route.post('/google', authCtrl.googleSignIn)

module.exports = route