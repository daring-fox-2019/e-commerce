const userModel = require('../models/user')
const Helper = require('../helpers/helper')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);

class User {
    static create( req, res, next ){
        const { name, email, password, address } = req.body
        const role = 'none'

        userModel.create( { name, email, password, address, role})
        .then( data => {
            res.status(201).json( data )
        })
        .catch( err => {
            next( err )
        })
    }

    static updateUser(req, res, next){
        const { address } = req.body
        const _id = req.decoded.id

        userModel.findOneAndUpdate({_id}, { address }, {new: true})
        .then( data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static postLogin(req, res, next){
        const { email, password } = req.body

        userModel.findOne({ email })
        .then(data => {
            if(data){
                if(Helper.compareHash(password, data.password)){
                    let token = Helper.generateJWT({ 
                        name : data.name, 
                        id : data._id, 
                        email : data.email,
                        role : data.role
                    })
                    res.status(200).json({ token, email : data.email, id:data._id, name:data.name, role:data.role })
                } else {
                    next({ message : `incorrect username/password`})
                }
            } else {
                next({ message : `user not yet registered`})
            }
        })
        .catch( err => {
            next( err )
        })
    }

    static googleSignIn(req, res, next){

        let payload

        client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID_GOOGLE
        })
        .then(ticket => {
            payload = ticket.getPayload()
            return userModel.findOne({ email : payload.email})
        })
        .then( user => {
            if(user){
                let token =  Helper.generateJWT({ email: user.email, id:user._id})
                res.status(200).json({
                    token, 
                    name: user.name, 
                    id: user._id,
                    role: user.role
                })
            } else {
                return userModel.create({ 
                    email: payload.email, 
                    password: process.env.PASSWORD, 
                    name: payload.name,
                    role: 'none'
                })
            }
        })
        .then( userData => {
            let token =  Helper.generateJWT({ 
                name : userData.name, 
                email: userData.email, 
                id: userData._id,
                role : userData.role,
            })
            res.status(200).json({token , name:userData.name, id:userData._id, role: userData.role, status: 'need-address'})
        })
        .catch( err =>{
            next(err)
        })
    }
}

module.exports = User