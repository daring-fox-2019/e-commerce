const User = require('../model/user')
const bcrypt = require('../helpers/bcrypt')
const jwt2 = require('../helpers/jwt')

module.exports = {
    addNewUser: function (req, res, next) {
        let name = req.body.name
        let email = req.body.email
        let password = req.body.password
        let address = req.body.address
        let phoneNumber = req.body.phoneNumber
        let pp = req.body.pp
        let hashedPas
        try {
            hashedPas = bcrypt.generateHash(password)
            if (!pp) {
                pp = ' https://storage.cloud.google.com/jualeun-qfs/userPhoto/default.png?_ga=2.138935030.-415458887.1554453586'
            }
            User.create({name, email, password: hashedPas, address, phoneNumber, pp})
                .then(newUser => {
                    res.status(201).json(newUser)
                })
                .catch(err => {
                    next(err)
                })
        } catch (err) {
            next(new Error('Invalid register input'))
        }
    },
    loginUser: function (req, res, next) {
        let email = req.body.email
        let password = req.body.password
        User.findOne({email})
            .then(userFound => {
                if (!userFound) {
                    next(new Error('Invalid login input'))
                } else {
                    if (!bcrypt.verifyPass(password, userFound.password)) {
                        next(new Error('Invalid login input'))
                    } else {
                        let jwtoken = jwt2.generateToken({
                            id: userFound._id,
                            name: userFound.name,
                            email: userFound.email,
                            address: userFound.address,
                            phoneNumber: userFound.phoneNumber,
                            pp: userFound.pp
                        })
                        res.status(200).json({
                            jwtoken,
                            id: userFound._id,
                            name: userFound.name,
                            pp: userFound.pp,
                            role: userFound.role
                        })
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    },
    updateUser: function (req, res, next) {
        let id = req.params.id
        let name = req.body.name
        let email = req.body.email
        let password = req.body.password
        let address = req.body.address
        let phoneNumber = req.body.phoneNumber
        let pp = req.body.pp
        let hashedPas = bcrypt.generateHash(password)
        User.updateOne({_id: id}, {name, email, password: hashedPas, address, phoneNumber, pp})
            .then(updatedUser => {
                res.status(201).json(updatedUser)
            })
            .catch(err => {
                next(err)
            })
    }
}