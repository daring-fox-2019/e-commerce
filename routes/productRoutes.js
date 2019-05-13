const router = require("express").Router()
const productCont = require('../controllers/productCont')
const Authorize = require('../middlewares/authorize')
const Authenticate = require('../middlewares/authenticate')
const upload  = require('../middlewares/upload')
const gcs = require('../middlewares/GCS')

router.post('/create', Authenticate, /* gcs.multer.single("image_url"), gcs.sendUploadToGCS, */ productCont.create)
router.get('/read', Authenticate, productCont.read)
router.get('/read/search', Authenticate, productCont.search)
router.get('/read/:_id', Authenticate, Authorize, productCont.readOne)
router.put('/update/:_id', Authenticate, Authorize, /* gcs.multer.single("image_url"), gcs.sendUploadToGCS, */ productCont.update)
router.delete('/delete/:_id', Authenticate, Authorize, productCont.delete)

module.exports = router