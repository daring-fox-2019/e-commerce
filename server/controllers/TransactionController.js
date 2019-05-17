const Cart = require('../models/cart')
const rajaOngkir = require('../helpers/rajaongkir')

class TransactionController {

    static getDataRajaOngkir(req, res) {
        rajaOngkir
        .get('/city')
        .then(({ data }) => {
          let city = [];
          let province = [];
          data.rajaongkir.results.forEach(result => {
            city.push({
              id: result.city_id,
              name: `${result.type} ${result.city_name}`
            })
            province.push({
              id: result.province_id,
              name: result.province
            })
          })
          res.status(200).json({
            message: 'Received Data From Raja Ongkir',
            dataOngkir: {
              city: city,
              province: province
            }
          })
        })
        .catch(error => {
          res.status(500).json({
            message: 'Internal Server Error'
          })
        })
    }

    static calculateOngkir (req, res) {
      rajaOngkir
        .post('/cost', {
          origin: (Number(req.body.origin)).toString(),
          destination: (Number(req.body.destination)).toString(),
          courier: req.body.courier,
          weight: Number(req.body.weight)*100
        })
        .then(({ data }) => {
          res.status(200).json({
            info: data.rajaongkir.results
          })
        })
        .catch(({ response }) => {
          console.log(response.data)
          res.status(500).json(error)
        })
    }

}


module.exports = TransactionController 