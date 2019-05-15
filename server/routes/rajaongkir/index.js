const router = require('express').Router()
const Ongkir = require('../../controllers/rajaongkir')

router.get('/province', Ongkir.getAllProvince)
router.get('/city', Ongkir.getAllCity)
router.post('/cost', Ongkir.cost)

module.exports = router