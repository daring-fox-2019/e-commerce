const productModel = require('../models/product')

class Product{
    static create(req, res, next){
        const { name, description, stock, image, price, tags, weight } = req.body
        const seller_id = req.decoded.id


        productModel.create({ name, description, stock, image, price, seller_id, tags, weight })
        .then( data => {
            res.status(201).json(data)
        })
        .catch( err =>{
            next(err)
        })
    }

    static getAll(req, res, next){
        let obj = {}
        const search = req.query.search
        
        if( req.decoded ) { 
            obj = { seller_id : req.decoded.id }
        }

        if( search ){
            let newCondition = 
                { $or:[{ name : { $regex : search, $options: 'i'}}, 
                {'tags.text':{ $regex : search, $options: 'i'}}] 
            }
            obj = {$and:[ obj , newCondition]}
        }

        productModel.find( obj )
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            console.log(err)
            next( err )
        })
        
    }

    static getOne(req, res, next){
        const _id = req.params.id

        productModel.findOne( { _id } )
        .populate('seller_id')
        .then( data => {
            res.status(200).json(data)
        }) 
        .catch( err => {
            next(err)
        })
    }

    static update(req, res,next){
        const { name, description, stock, image, price, tags,  weight } = req.body
        const obj = { name, description, stock, image, price, tags, weight }

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