const controller = require('../controllers/image')
const router = require('express').Router()
const { authenticate, adminAuthorization } = require('../middlewares/auth.js')
const {multer, sendUploadToGCS} = require('../middlewares/gcs')

router.use(authenticate)
router.use(adminAuthorization)
router.post('/', multer.single('image'), sendUploadToGCS, controller.uploadPicture)

module.exports = router