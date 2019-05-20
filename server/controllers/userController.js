const User = require('../models/user-model')
const Cart = require('../models/cart-model')
const { sign } = require('../helpers/jwt')
const { compare } =  require('../helpers/bcrypt')

class Controller{
    static signUp(req,res){
        let newUser;
        const {email,password} = req.body
        User
            .create({
                email:email,
                password:password
            })
            .then((user) => {
                newUser = user
                return Cart.create({
                    UserId:user._id,
                    products:[]
                })
            })
            .then(() => {
                res.status(201).json({newUser , msg: 'Thanks for registering'})
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static signIn(req,res){
        const {email,password} = req.body
        User
            .findOne({
                email:email
            })
            .then((user) => {
                if(!user){
                    res.status(401).json({
                        message:'Wrong Email/Password'
                    })
                }
                else{
                    if(!compare(password,user.password)){
                        res.status(401).json({message : 'Wrong Email/Password'})
                    }
                    else{
                        const {id,email,role} = user
                        const payload = {id:id,email:email,role:role}
                        const token = sign(payload)
                        req.headers.token = token
                        res.status(200).json({
                            message:"login success",
                            token:token,
                            details:payload
                        })
                    }
                }
            })
            .catch((err) => {
                res.status(500).json(err)
            }) 
    }
}

module.exports = Controller