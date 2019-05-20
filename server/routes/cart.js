const router = require('express').Router();
const user = require('../controller/user')
const { multer, sendUploadToGCS, fromBase64toFile } = require('../helpers/image-utility')


router.post('/',user.Patch)
router.patch('/:id',  user.Patch)
router.delete('/:id', user.Delete)


module.exports = router