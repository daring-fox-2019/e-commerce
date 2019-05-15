const productModel = require('../models/product')

class Product{
    static create(req, res, next){
        const { name, description, stock, image, price, tags } = req.body
        const userId = req.decoded.id

        productModel.create({ name, description, stock, image, price, userId, tags })
        .then( data => {
            res.status(201).json(data)
        })
        .catch( err =>{
            next(err)
        })
    }

    static getAll(req, res, next){
        let obj = {}

        if( req.decoded ) { 
            obj = { userId : req.decoded.id }
        }

        productModel.find( obj )
        .then( data => {
            res.status(200).json(data)
        }) 
        .catch( err => {
            next(err)
        })
    }

    static getOne(req, res, next){
        const _id = req.params.id

        productModel.findOne( { _id } )
        .then( data => {
            res.status(200).json(data)
        }) 
        .catch( err => {
            next(err)
        })
    }

    static update(req, res,next){
        const { name, description, stock, image, price } = req.body
        const obj = { name, description, stock, image, price }

        Object.keys(obj).map( el => {
            if( obj[el] == null) {
                delete obj[el]
            }
        })

        const _id = req.params.id

        productModel.findOneAndUpdate( { _id }, obj , { new : true, runValidators: true})
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        const _id = req.params.id

        productModel.findOneAndDelete( { _id } )
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }
}

module.exports = Product