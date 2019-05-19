const route = require('express').Router()
const authCtrl = require('../controllers/authController')
const authenticate = require('../middlewares/authenticate')
const {multer, sendUploadToGCS} = require('../helpers/images')

route.get('/user', authenticate, authCtrl.currentUser)
route.patch('/user', authenticate, authCtrl.update)
route.patch('/user/profpic', multer.single('image'), sendUploadToGCS, authenticate, authCtrl.updatePicture)

route.post('/register', authCtrl.signup)
route.post('/login', authCtrl.signin)
route.post('/google', authCtrl.googleSignIn)
route.get('/linkedin/redirect', authCtrl.linkedinRedirect)

module.exports = route