const User = require('../models/user')
const {compare} = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')
const {verify} = require('../helpers/jwt')
class UserController {
    static getDecode(req, res){
        const decode = verify(req.headers.token)
        res.status(200).json(decode)

    }
    static signUp(req, res){
        console.log(req.body);
        
        const {name, email, password, phone} = req.body
        User.create({
            name,
            email,
            password,
            phone,
            role : 'customer'
        })
        .then(function (data) {
            res.status(201).json(data)
            
        })
        .catch(function (err) {
            console.log(err);
            
            res.status(400).json(err)
            
        })

    }

    static signUpAdmin(req, res){
        User.create({
            name : 'udin',
            email : process.env.EMAIL,
            password : process.env.PASSWORD,
            phone : '90909090909',
            role : 'admin'
        })
        .then(function (data) {
            res.status(201).json(data)
            
        })
        .catch(function (err) {
            res.status(400).json(err)
            
        })

    }

    static login(req, res){
        let {email, password} = req.body
        User.findOne({
            email
        })
        .then(function (dataUser) {
            if(!dataUser){
                res.status(401).json({
                    msg: 'email/password incorrect'
                })

            }else if(!compare(password, dataUser.password)){
                res.status(401).json({
                    msg : 'Email/Password is incorrect'
                })

            }else {
                
                const {id, email, role} = dataUser
                const payload = {id, email,role}
                const token = sign(payload)
                res.status(200).json({
                    msg : 'you have successly logged in',
                    token : token,
                    details: payload
                })
            }
            
        })
        .catch(function (err) {
            res.status(500).json(err)
            
        })
    }
}

module.exports = UserController