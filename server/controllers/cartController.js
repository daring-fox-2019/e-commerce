const Cart = require('../models/cart')

class CartController {
    static create(req, res){
        const {idUser, quantity, productId} = req.body
        Cart.create({
            idUser,
            productId,
            quantity,
            status : 'onCart'
    
        })
        .then(function (data) {
            res.status(201).json(data)
            
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })

    }

    static readAll(req, res){
        let userId = req.params.id
        Cart.find({idUser: userId, status: 'onCart'}, null, {sort:{_id:-1}})
        .populate('idUser')
        .populate('productId')
        .then(data =>{
            res.status(200).json(data)

        })
        .catch(err =>{
            res.status(400).json(err)
        })
    }

    

    static updateStatus(req, res){
        let UserId = req.params.id
        Cart.updateMany({idUser: UserId, status: 'onCart'},
        {
            status : 'pay'
        }
        )
        .then(function (data) {
            res.status(201).json(data)
        })
        .catch(function (err) {
            res.status(401).json(err)
            
        })

    }

    static deleteEach(req, res){
        let CartId = req.params.id
        Cart.deleteOne({
            _id: CartId,
        })
        .then(function (data) {
            res.status(201).json(data)
        })
        .catch(function (err) {
            res.status(401).json(err)
        })

    }

}

module.exports = CartController