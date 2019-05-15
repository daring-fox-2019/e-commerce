const router = require('express').Router()
const User = require('../../controllers/user')

router.post('/register', User.create)
router.post('/login', User.postLogin)

module.exports = router