const route = require('express').Router()
const authCtrl = require('../controllers/authController')
const authenticate = require('../middlewares/authenticate')

route.get('/user', authenticate, authCtrl.currentUser)
route.post('/register', authCtrl.signup)
route.post('/login', authCtrl.signin)
route.post('/google', authCtrl.googleSignIn)
route.get('/linkedin/redirect', authCtrl.linkedinRedirect)

module.exports = route