const axios = require('axios')

class Ongkir{
    static getAllProvince(req, res, next){
        axios.get('https://api.rajaongkir.com/starter/province', 
            { headers : { key : process.env.RAJAONGKIR_KEY}})
        .then( ({data}) => {
            data = data.rajaongkir.results.map( el => {
                el.value = el.province_id
                el.text = el.province
                delete el.province_id
                delete el.province
                return el
            })
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static getAllCity(req, res, next){
        const { province } = req.query

        axios.get('https://api.rajaongkir.com/starter/city', 
            {headers : { 
                key : process.env.RAJAONGKIR_KEY}, 
                params: { province }
            })
        .then( ({data}) => {
            data = data.rajaongkir.results.map( el => {
                el.value = el.city_id
                el.text = el.city_name
                delete el.city_id
                delete el.city_name
                delete el.type
                return el
            })
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static cost(req, res, next){
        const { origin, destination, weight, courier } = req.body

        axios.post('https://api.rajaongkir.com/starter/cost',
        { origin, destination, weight, courier },
        {headers : { 
            key : process.env.RAJAONGKIR_KEY}
        })
        .then( ({data}) => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }
}

module.exports = Ongkir