const router = require("express").Router()
const userCont = require('../controllers/userCont')
const Authorize = require('../middlewares/authorize')
const Authenticate = require('../middlewares/authenticate')

router.post('/add/:_id', Authenticate, userCont.addToCart)
router.get('/', Authenticate, userCont.readCart)
// router.put('/update/:_id', Authenticate, Authorize, userCont.updateCart)
router.put('/delete/:_id', Authenticate, /* Authorize, */ userCont.deleteCart)

module.exports = router