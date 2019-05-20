const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class UserController {
    static register(req,res) {
        const { email, name, password, role} = req.body
        const create_obj = {email, name, password, role}

        User.create(create_obj)
        .then(created => {
            const { _id, email, name} = created
            const to_be_signed = {
                _id,
                email,
                name,
            }
            const token = sign(to_be_signed)
            const to_be_send = {...to_be_signed, token}

            res.status(201).json(to_be_send)
        })
        .catch(err => {
            let message;
            if(err.errors.email) {
                message = err.errors.email.message
            } else if (err.errors.name) {
                message = err.errors.name.message
            } else if (err.errors.password) {
                message = err.errors.password.message
            } else {
                message = err.message
            }
            res.status(500).json({
                error: err,
                message
            })
        })
    }

    static login(req,res) {
        const { email, password } = req.body
        User.findOne({email})
        .then(found => {
            if(found) {
                if(compare(password, found.password)) {
                    const { _id, email, name } = found
                    const to_be_signed = { _id, email, name }
                    const token = sign(to_be_signed)

                    res.status(200).json({ token, _id, name, email })
                } else {
                    res.status(400).json({message: 'Invalid email/password'})
                }
            } else {
                res.status(400).json({message: 'Invalid email/password'})
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error when login user'
            })
        })
    }

    static getCartData(req,res) {
        const { _id } = req.decoded
        console.log(req.decoded, '--------getcartdata')

        User.findOne({_id})
        .populate({path: 'cart', populate: {path: 'product'}})
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                error: 'error getCartData',
                message:err.message,
            })
        })
    }

    static updateCart(req,res) {
        const { _id } = req.decoded
        let update_obj

        if(req.cart_item_id) {
            // const product_id = req.body.add_item_to_cart
            // const { quantity } = req.body
            update_obj = {$push: { cart:  req.cart_item_id}}
        } else if(req.body.remove_item_from_cart ) {
            const cart_id = req.body.remove_item_from_cart
            update_obj = {$pull: { cart: cart_id }}
            // console.log(update_obj, '=====================')
        }


        User.findOneAndUpdate({_id}, update_obj , {new:true})
        .populate({path: 'cart', populate: {path: 'product'}})
        .then(updated => {
            // console.log(updated, ' ---- updated')
            res.status(200).json(updated)
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({
                message: err.message,
                error: 'error updating user\'s cart'
            })
        })
    }
}
module.exports = UserController