const Cart = require('../models/cart')
const rajaOngkir = require('../helpers/rajaongkir')
const Transaction = require('../models/transaction')

class TransactionController {

  static getDataRajaOngkir(req, res) {
    rajaOngkir
      .get('/city')
      .then(({
        data
      }) => {
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

  static calculateOngkir(req, res) {
    rajaOngkir
      .post('/cost', {
        origin: (Number(req.body.origin)).toString(),
        destination: (Number(req.body.destination)).toString(),
        courier: req.body.courier,
        weight: Number(req.body.weight) * 100
      })
      .then(({
        data
      }) => {
        res.status(200).json({
          info: data.rajaongkir.results
        })
      })
      .catch(({
        response
      }) => {
        console.log(response.data, 'INI DEH KAYAKNY')
        res.status(500).json(error)
      })
  }

  static async getUserTransaction(req, res) {
    try {
      let trans = await Transaction.find({
        userId: req.params.id
      })
      res.status(200).json(trans)
    } catch (error) {
      res.status(500).json(error)
    }
  }

static async update(req, res) {
  try {
    let trans = await Transaction.findByIdAndUpdate(req.params.id, {
      $set: {
        ...req.body
      }
    }, {
      new: true,
      runValidators : true
    })
    if (trans) res.status(200).json(trans)
    else res.status(404).json({
      message: 'No such transaction found'
    })
  } catch (error) {
    if (error.errors) res.status(400).json(error)
    else res.status(500).json(error)
  }
}

static async aggregateMo(req,res) {
  try {
    let data = await Transaction.aggregate([
      {
        $group: 
        { 
          _id : {$month : "$createdAt"},
          revenue : {$sum: "$total"}
        }
    }])

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}

static async getAll(req, res) {
  
  console.log('MASUK SINIIIII?????????');

  try {
    let alltrans = await Transaction.find({}).populate("userId").populate("carts.productId")

    res.status(200).json(alltrans)
    console.log(alltrans, 'DAPET GAAAA OI');

  } catch (error) {
    console.log(error, 'maaasukk siniii???');

    if (error.errors) res.status(400).json(error)
    else res.status(500).json(error)
  }
}
}


module.exports = TransactionController