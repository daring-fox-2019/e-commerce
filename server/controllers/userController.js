const User = require('../models/userModels')
const { verifyPassword } = require('../helpers/bcrypt')
const { createAccessToken } = require('../helpers/token')

class UserController{
    static gets(req, res, next){
        User.find({})
            .then(users=>{
                res.status(200).json(users)
            })
            .catch(err=>{
                next(err)                
            })
    }
    static signup(req, res, next){
        // console.log('signup')
        let { name, email, password } = req.body
        User.create({
            name, email, password
        })
        .then(newUser=>{
            res.status(201).json(newUser)
        })
        .catch(err=>{
            // console.log('error controler')
            next(err)
        })
    }
    static login(req, res, next){
        let { email, password } = req.body
        User.findOne({ email })
            .then(user=>{
                if(user && verifyPassword(password, user.password)){
                    const accessToken = createAccessToken({
                        userId: user._id,
                        email: user.email
                    })
                    res.status(200).json({
                        token: accessToken,
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    })
                }else{
                    next({ name: 'loginFailed'})                
                }
            })
            .catch(err=>{
                next(err)                
            })
    }
    static delete(req, res, next){
        User.findByIdAndDelete(req.params.id)
        .then((deleted)=>{
            res.status(200).json(deleted)
        })
        .catch((err)=>{
            next(err)
        })
    }
}

module.exports = UserController
