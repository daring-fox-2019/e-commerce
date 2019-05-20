const { User }= require('../models')
const { hash } = require('../helpers')
const { compare } = require('../helpers')
const { sign } = require('../helpers')

class ControllerUser {
    static create(req,res){
        let { username,email,password } = req.body
        let hashed = hash(password)
        User
            .create({ username, email, password : hashed })
            .then(data =>{
                let token = sign({ email })
                res.status(201).json({ token })
            })
            .catch(err =>{
                console.log(err)
                res.status(400).json(err.message)
            })
    }
    static login(req,res){
        let { email,password } = req.body
        User
            .findOne({email})
            .then(found =>{
                if(found) {
                    if(!compare(password,found.password)){
                        res.status(400).json({ message: 'username / password invalid'})
                    }else {
                        let token = sign({email : found.email})
                        res.status(200).json({ token })
                    }
                }else {
                    res.status(400).json('username / password invalid')
                }
            })
            .catch(err =>{
                res.status(500).json({ 
                    message : 'Internal server error'
                })
            })
    }
}
module.exports = ControllerUser

