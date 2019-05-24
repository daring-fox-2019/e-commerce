const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController{

    static register(req,res){
        console.log('masuk',req.body);
        User
        .create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password
        })
        .then(users=>{
            res.status(200).json(users)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`
            })
        })
    }

    static login(req,res){
        User
        .findOne({email : req.body.email})
        .then(user =>{
            if(user){
                let check = bcrypt.compareSync(req.body.password,user.password)
                if(check){
                    let payload = {
                        id: user._id,
                        email: user.email
                    }
                    let token = jwt.sign(payload, `${process.env.SECRET_KEY}`)
                    res.status(201).json({
                        msg : `logged in`,
                        token,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        id: user._id,
                    })
                }else{
                    res.status(404).json({
                        msg: `username/password salah`
                    })
                }
            }else{
                res.status(404).json({
                    msg: `username/password salah`
                })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                msg: `internal server error`
            })
        })
    }

    static getAll(){
        User
        .find({})
        .then(users=>{
            res.status(200).json(users)
        })
        .catch(err=>{
            res.status(500).json({
                msg : `internal server error`
            })
        })
    }
}

module.exports = UserController