const Product = require('../models/product')

class ProductController {
    static create(req, res){
        const {name,image,price,stock, description} = req.body 
        Product.create({
            name,
            description,
            image,
            price,
            stock,
            createdAt : new Date().toDateString(),
    
        })
        .then(function (data) {
            res.status(201).json(data)
            
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })

    }

    static readAll(req, res){
        Product.find(null,null, {sort:{_id:-1}})
        .then(data =>{
            res.status(200).json(data)

        })
        .catch(err =>{
            res.status(400).json(err)
        })
    }

    static readOne(req, res){
        let dataId = req.params.id
        Product.findOne({
            _id: dataId
        })
        .then(function (data) {
            if(!data){
                res.status(401).json({
                    msg: 'data not found'
                })
            }else {
                res.status(200).json(data)
            }
            
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })
    }

    static update(req, res){
        let ProductId = req.params.id
        const { name,price,image,stock} = req.body
       let obj = {
        createdAt: new Date(),
        name,
        price,
        image,
        stock
       }
       for (const key in obj) {
           if(obj[key] === undefined){
               delete obj[key]

           }
       }
        Product.findOneAndUpdate({_id: ProductId}, obj
        )
        .then(function (data) {
            res.status(201).json({
                id: data.id,
                rowChange: obj
            })
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })

    }

    static delete(req, res){
        let ProductId = req.params.id
        Product.findOneAndDelete({
            _id: ProductId
        })
        .then(function (data) {

            res.status(201).json(data)
            
        })
        .catch(function (err) {
            res.status(401).json(err)
        })

    }
}

module.exports = ProductController