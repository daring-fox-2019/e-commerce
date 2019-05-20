const router = require('express').Router()
const auth = require('../controller/auth')
const {fromBase64toFile,sendUploadToGCS} = require('../helpers/image-utility')

router.post('/login', auth.login)
router.post('/verify', auth.verify)

router.post('/google-login', auth.googleLogin)
router.post('/register',
    fromBase64toFile,
    sendUploadToGCS,
    auth.register)

module.exports = router