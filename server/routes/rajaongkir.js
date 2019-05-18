const router = require('express').Router()
const rajaongkir = require('../controllers/rajaongkir')

router.get('/province', rajaongkir.getProvince)
router.post('/city', rajaongkir.getCity)
router.post('/cost', rajaongkir.getCost)

module.exports = router