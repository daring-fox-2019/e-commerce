const axios = require('axios')

class rajaongkir {
  static getProvince(req, res) {
    axios
      .get("https://api.rajaongkir.com/starter/province", {
        headers: {
          key: process.env.RAJAONGKIR_KEY
        }
      })
      .then(({ data }) => {
        res.status(200).json(data.rajaongkir.results)
      })
      .catch(err => {
        res.status(500).json(err)
      });
  }

  static getCity(req, res) {
    axios
      .get(`https://api.rajaongkir.com/starter/city?province=${req.body.idProvince}`, {
        headers: {
          key: process.env.RAJAONGKIR_KEY
        }
      })
      .then(({ data }) => {
        res.status(200).json(data.rajaongkir.results)
      })
      .catch(err => {
        res.status(500).json(err)
      });
  }

  static getCost(req, res) {
    axios
      .post(`https://api.rajaongkir.com/starter/cost`,
        {
          origin: '153',
          destination: req.body.idCity,
          weight: 1000,
          courier: 'jne',
        }, {
          headers: {
            key: process.env.RAJAONGKIR_KEY
          }
        })
      .then(({ data }) => {   
        let newData = data.rajaongkir.results[0].costs[data.rajaongkir.results[0].costs.length-1].cost

        res.status(200).json(newData[0])
      })
      .catch(err => {        
        res.status(500).json(err)
      });
  }
}

module.exports = rajaongkir