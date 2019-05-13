const User = require('../models/user-model')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class UserController {

    static async register(req, res) {
        try {
            let newUser = await User.create(req.body)
            res.status(201).json(newUser)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }

    }

    static async signIn(req, res) {
       
        const { email, password } = req.body
        User
            .findOne({
                email
            })
            .then((findOneUser) => {
                if (!findOneUser) res.status(401).json({ message: 'Email/Password is incorrect!' })
                else if (!compare(password, findOneUser.password)) res.status(401).json({ message: 'Email/Password is incorrect!' })
                else {
                    const { id, firstName, lastName, email } = findOneUser
                    const payload = { id, firstName, lastName, email }
                    const token = sign(payload)
                    req.headers.token = token
                    res.status(200).json({
                        message: 'You have successfully logged in!',
                        token,
                        details: payload
                    })
                }
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController