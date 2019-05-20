const Product = require('../models/product')

module.exports = (err, req, res, next) => {
    if(req.headers.hasOwnProperty('token')) {
        Product.findOne({owner:req.params.id})
        .then((product) => {
            if(product) {
                if(product.owner==req.decoded.id) {
                    next()
                }else{
                    res.status(400).json([])
                }
            }
        })
        .catch(err => {
            res.status(500).json({'msg': 'Request error'})
        })
    }else {
        res.status(400).json({'msg': 'Not authorize'})
    }
}