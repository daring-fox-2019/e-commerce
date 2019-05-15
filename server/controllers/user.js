const userModel = require('../models/user')
const Helper = require('../helpers/helper')

class User {
    static create( req, res, next ){
        const { name, email, password, address } = req.body

        userModel.create( { name, email, password, address })
        .then( data => {
            res.status(201).json( data )
        })
        .catch( err => {
            next( err )
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
                        email : data.email
                    })
                    res.status(200).json({ token, email : data.email, id:data._id, name:data.name })
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
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID_GOOGLE
        })
        .then(ticket => {
            payload = ticket.getPayload()
            //console.log(payload)
            return userModel.findOne({ email : payload.email})
        })
        .then( user => {
            if(user){
                let token =  Helper.generateJWT({ email: user.email, id:user._id})
                res.status(200).json({
                    token, 
                    name: user.name, 
                    id: user._id 
                })
            } else {
                return userModel.create({ 
                    email: payload.email, 
                    password: process.env.PASSWORD, 
                    name: payload.name
                })
            }
        })
        .then( userData => {
            let token =  Helper.generateJWT({ 
                name : userData.name, 
                email: userData.email, 
                id: userData._id
            })
            res.status(200).json({token , name:user.name, id:user._id})
        })
        .catch( err =>{
            console.log(err)
            next(err)
        })
    }
}

module.exports = User