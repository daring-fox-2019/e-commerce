const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {

    static async create(req, res) {
        try {
            let data = await User.create({...req.body})               
            res.status(201).json(data)
        } catch (error) {            
            res.status(500).json(error)
        }
    }

    static async login(req, res) {
        try {
            let found = await User.findOne({email : req.body.email})
            if (found) {
                if (!bcrypt.compareSync (req.body.password, found.password)) {
                    res.status(400).json({message : 'Username/Password Invalid'})
                } else {
                    let {email, _id, name, role} = found
                    let token = jwt.sign({
                        id : _id,
                        email,
                        name
                    }, process.env.JWT_SECRET)
                    req.headers.token = token

                    res.status(200).json({token, _id, name, role})
                }
            } else {
                res.status(400).json({message : 'Username/Password Invalid'})
            }
        } catch(err) {
            console.log(err, 'bagian local login');
            res.status(500).json(err)
        }
    }

    static async findAll(req,res) {
        try {
            let users = await User.find({})
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = UserController