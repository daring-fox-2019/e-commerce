const User = require('../models/user')
const Helper =require('../helpers/helper')

class UserController {
    static signin(req, res) {
        const {email, password} = req.body

        User.findOne({
            email
        })
        .then(user => {
            if(!user) {
                throw 'Username/password wrong'
            } else {
                if( Helper.comparePassword(password, user.password) ) {
                    let token = Helper.generateJWT({
                        role: user.role,
                        email: user.email,
                        name: user.name,
                        id: user._id
                    });

                    let finalToken = {
                        token,
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };

                    res.status(200).json(finalToken)
                }else{
                    throw 'Username/password wrong'
                }
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message: err})
        })
    }

    static signup(req, res) {
        const {name, email, password} = req.body

        User
        .create({
            name,
            email,
            password,
            role: 'Customer'
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message:err})
        })
    }

    static signupAdmin(req, res) {
        const {name, email, password} = req.body

        User
        .create({
            name,
            email,
            password,
            role: 'Admin'
        })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({message:err})
        })
    }

    static findOne(req, res) {
        User
        .findById(req.params.id)
        .then(user=> {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = UserController
