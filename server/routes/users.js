const router = require('express').Router()
const conUsers = require('../controller/users')
const uploadImage = require('../middlewares/uploadImage')


router.post('/register', uploadImage, conUsers.addNewUser)
router.post('/login', conUsers.loginUser)
router.put('/update/:id', conUsers.updateUser)

module.exports = router