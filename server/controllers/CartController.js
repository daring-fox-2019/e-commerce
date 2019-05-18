const Cart = require('../models/cart')
const Product = require('../models/product')
const Transaction = require('../models/transaction')

class CartController {

    static async findByUser (req, res) {
        try {
            let found = await Cart.find({userId : req.authenticatedUser.id}).populate('productId')
            res.status(200).json(found)
        } catch (error) {
            // console.log(error, 'dari findall cart');      
            if (error.errors) res.status(400).json(error)
            else res.status(500).json(error)
        }
    }

    static async createCart(req, res) {
        try {
            let foundorcreated = await Cart.findOneAndUpdate({productId : req.body.productId, userId : req.authenticatedUser.id}, {amount : req.body.amount}, {upsert : true, runValidators: true, new : true})
            foundorcreated ? res.status(200).json(foundorcreated) : res.status(404).json({message : 'Cart not found'})
        } catch (error) {
            // console.log('error bag createcart', error);
            if (error.errors) res.status(400).json(error)
            else res.status(500).json(error)
        }
    }

    static async checkoutDelete(req, res) {
        try {
            let productListFromTrans = []
            let carts = await Cart.find({userId : req.authenticatedUser.id})

            carts.forEach(async cart => {
                let data = await Product.findById(cart.productId)
                data.stock -= +cart.amount
                data.sold += +cart.amount
                await data.save()
                console.log('HAI MAU NGECEK ARRAY PRODUK KENAPA GAK MASUK HUHU //////////');
                // console.log(productListFromTrans);
            })

            carts.forEach(cart => {
                productListFromTrans.push({productId : cart.productId, amount : cart.amount})
            })
            
            await Transaction.create({
                userId : req.authenticatedUser.id, 
                carts : productListFromTrans, 
                total : req.body.total,
                deliverPrice : req.body.deliverPrice,
                address : req.body.address,
                recipientName : req.body.recipientName
            })
            let deleted = await Cart.deleteMany({userId : req.authenticatedUser.id})
            res.status(200).json(carts)
            
        } catch (error) {
            // console.log(error, 'HOIIIII');
            
            if (error.errors) res.status(400).json(error)
            else res.status(500).json(error)
        }
    }

    static async deleteCart(req,res) {
        try {
            let deleted = await Cart.findByIdAndDelete(req.params.id)
            deleted ? res.status(200).json(deleted) : res.status(404).json({message : 'Cart not deleted'})
        } catch (error) {
            // console.log('error bag DELET CART', error);
            if (error.errors) res.status(400).json(error)
            else res.status(500).json(error)
        }
    }

    static async updateCartQty(req,res) {
        // console.log(req.headers, '???');
        
        try {
            if (req.body.type == 'inc') {         
                let incremented =  await Cart.findOneAndUpdate({_id : req.params.id}, { $inc : { amount : 1} }, {new : true})
                incremented ? res.status(200).json(incremented) : res.status(404).json({message : 'Cart not found and updated'})
            } else if (req.body.type == 'dec') {
                let decremented =  await Cart.findOneAndUpdate({_id : req.params.id}, { $inc : { amount : -1} }, {new : true})
                decremented ? res.status(200).json(decremented) : res.status(404).json({message : 'Cart not found and updated'})
            } else {
                let updated =  await Cart.findOneAndUpdate({_id : req.params.id}, { $set : {...req.body} }, {new : true})
                updated ? res.status(200).json(updated) : res.status(404).json({message : 'Cart not found and updated'})

            }
        } catch (error) {
            // console.log('error bag update cart qty', error);
            if (error.errors) res.status(400).json(error)
            else res.status(500).json(error)
        }
    }

}

module.exports = CartController