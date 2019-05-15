const jwt = require('jsonwebtoken')
const productModel = require('../models/product')
const cartModel = require('../models/cart')

module.exports = {
    authenticate(req, res, next){
        if( req.headers.token ){
            try{
                let decoded = jwt.verify( req.headers.token, process.env.JWT_KEY )
                req.decoded = decoded
                next()
            } catch( err ){
                next(err)
            }
        } else {
            next( { message : `Unauthenticate` } )
        }
    },
    authorization(req, res, next){
        const _id = req.params.id

        productModel.findById({ _id })
        .then( data => {
            if( data.userId == req.decoded.id ){
                next()
            } else {
                next({ message: 'Unauthorize'})
            }
        })
        .catch( err =>{
            next(err)
        })
    },
    authorizationCart( req, res, next ){
        const _id = req.params.id

        cartModel.findById({ _id })
        .then( data => {
            if( data.user_id == req.decoded.id ){
                next()
            } else {
                next({ message: 'Unauthorize'})
            }
        })
    }
}