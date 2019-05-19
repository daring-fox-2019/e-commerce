const transactionModel = require('../models/transaction')


class Transaction {
    static create( req, res, next){
        const buyer_id = req.decoded.id
        const { qty, product_id, status, resi, shipping, total, seller_id } = req.body

        transactionModel.create(
            { buyer_id, 
                qty, 
                product_id, 
                status, 
                resi, 
                shipping, 
                total, 
                seller_id
            })
        .then( data => {
            res.status(201).json(data)
        })
        .catch( err => {
            next( err )
        })
    }

    static update(req, res,next){
        const { status, resi } = req.body
        const obj = { status , resi }

        Object.keys(obj).map( el => {
            if( obj[el] == null) {
                delete obj[el]
            }
        })

        const _id = req.params.id

        transactionModel.findOneAndUpdate( { _id }, obj , { new : true, runValidators: true})
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }


    static getAll(req, res, next){
        let obj = {}
        let buyer_id = req.decoded.id

        if(req.decoded.role == 'admin'){
            obj = {}
        } else if(req.decoded.id){
            obj = { buyer_id }
        }

        transactionModel.find(obj)
        .populate({ 
            path:'product_id',
            model : 'Product',
            populate : {
                path : 'seller_id',
                select: ['name', 'email', 'address']
            }
        })
        .populate({
            path: 'buyer_id',
            select: ['name', 'email', 'address']
        })
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static getAllSell(req, res,next){

        let obj = {}
        let seller_id = req.decoded.id

        if(req.decoded.role == 'admin'){
            obj = {}
        } else if(req.decoded.id){
            obj = { seller_id }
        }

        transactionModel.find( obj )
        .populate({ 
            path:'product_id',
            model : 'Product',
            populate : {
                path : 'seller_id',
                select: ['name', 'email', 'address']
            }
        })
        .populate({
            path: 'buyer_id',
            select: ['name', 'email', 'address']
        })
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static delete(req, res, next){
        const _id = req.params.id

        transactionModel.findOneAndDelete({ _id })
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }
}

module.exports = Transaction