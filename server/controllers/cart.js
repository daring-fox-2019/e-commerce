const { Cart } = require('../models')
class ControllerCart {
    static create(req,res) {
        let userId = req.user._id
        let { _id, title, description, price, kategori, image, stock } = req.body
        Cart.create({
            userId ,
            itemId : _id,
            title,
            description,
            price, 
            kategori,
            image,
            stock
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
    static findAll(req,res) {
        let userId = req.user._id
        Cart.find({ userId : userId })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json('internal server error')
        })
    }
    static update (req,res) {
        Cart.findOneAndUpdate({_id : req.params.id},{$set : {quantity : req.body.quantity}}, {new : true})
        .then( data =>{
            res.status(200).json()
        })
        .catch(err =>{
            res.status(500).json ({
                message : 'internal server error'
            })
        })
    }
    static delete(req,res) {
        let { id } = req.params
        Cart.deleteOne({ _id : id})
        .then(()=>{
            res.status(200).json({
                message: 'delete successfully'
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
}
module.exports = ControllerCart