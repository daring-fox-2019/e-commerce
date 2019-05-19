const cartModel = require('../models/cart')

class Cart {
    static create(req, res, next){
        const user_id = req.decoded.id
        const { product_id, qty } = req.body

        cartModel.create( { product_id, user_id, qty } )
        .then( data => {
            
            res.status(201).json(data)
        }) 
        .catch( err => {
            next(err)
        })
    }

    static update(req, res, next){
        const { qty } = req.body
        const _id = req.params.id

        cartModel.findOneAndUpdate( { _id }, qty , { new : true, runValidators: true})
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static delete(req, res, next){
        const _id = req.params.id

        cartModel.findOneAndDelete({ _id })
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static getOne(req, res, next){
        const _id = req.params.id

        cartModel.findById(_id)
        .populate({ 
            path:'product_id',
            model : 'Product',
            populate : {
                path : 'seller_id',
                select: ['name', 'email', 'address']
            }
        })
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next( err )
        })
    }

    static getAll(req, res, next){
        let obj = {}

        if( req.decoded ){
            obj = { user_id : req.decoded.id }
        }

        cartModel.find( obj )
        .populate({ 
            path: 'product_id',
            populate : 
                { path: 'seller_id',
                  select: ['email', 'name', '_id', 'address']
                }
        })
        .populate({ 
            path : 'user_id',
            select: ['email', 'name', '_id', 'address']
         })
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    
}

module.exports = Cart