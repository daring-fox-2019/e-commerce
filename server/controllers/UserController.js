const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class UserController {
    static register(req, res) {
        const { name, email, password } = req.body
        let hash = bcrypt.hashSync(password)
        User
            .create({ name, email, password: hash })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static login(req, res) {
        const { email, password } = req.body
        User
            .findOne({ email })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        const myToken = jwt.sign({
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        })
                        res.status(200).json({
                            token: myToken,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        })
                    } else {
                        res.status(400).json("Wrong email / password")
                    }
                } else {
                    res.status(400).json("Wrong email / password")
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findOne(req, res) {
        User
            .find({ _id: req.params.id })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }


    static findByToken(req, res) {
        User
            .findOne({ _id: req.decoded._id })
            .then(user => {
                res.status(200).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findAll(req, res) {
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController