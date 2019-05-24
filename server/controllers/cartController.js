const Cart = require('../models/carts')

class CartController{
    static getAll(req,res){
        Cart
        .find({})
        .then(carts =>{
            res.status(200).json(carts)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : 'internal server error'
            })
        })
    }
    
    static create(req,res){
        console.log('masuk di create cart awal');
        
        Cart
        .create({
            userId : req.body.userId,
            products : []
        })
        .then(cart =>{
            res.status(201).json(cart)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`
            })
        })
    }

    static getOne(req,res){
        Cart
        .findOne({_id : req.params.id})
        .then(cart =>{
            res.status(201).json(cart)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                msg : `internal server errror`
            })
        })
    }

    static addToCart(req,res){
        let productId = req.params.productid
        let userId = req.params.userid
        Cart
        .findOneAndUpdate({userId},{$push : {products : productId}},{new : true})
        .then(cart =>{
            console.log(cart);
            res.status(201).json(cart)
        })
        .catch(err =>{
            console.log(err);
            res.status(501).json({
                msg : `internal server error`
            })
        })
    }

    static getUserCart(req,res){

        let userId = req.params.userid
        console.log('masuk ke get user cart',userId);
        
        Cart
        .findOne({userId})
        .populate('products')
        .then(cart=>{
            res.status(200).json(cart)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`
            })
        })
    }

    static resetCart(req,res){
        let cartId = req.params.cartid
        Cart
        .findOneAndUpdate({_id : cartId},{$set: {products : []}},{new : true})
        .then(cart =>{
            res.status(200).json(cart)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`
            })
        })
    }

    static removeItem(req,res){
        let cartId = req.params.cartid
        let productId  =req.params.productid
        console.log('masuk remove item',cartId,productId);
        Cart
        .findOne({_id : cartId})
        .then(data =>{
            console.log('dapet cart',data);
            let checkProduct = data.products.indexOf(productId)
            if(checkProduct !== -1){
                console.log('ada data dan mau splice',checkProduct);
                data.products.splice(checkProduct,1)
                return data.save()
            }else{ 
                return data
            }
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`
            })
        })
    }
}

module.exports = CartController