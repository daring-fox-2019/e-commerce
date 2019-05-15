const modelUser = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class userController {
  static signup(req, res) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    modelUser.create(newUser)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json({ err })
      })
  }

  static signin(req, res) {
    modelUser.findOne({ email: req.body.email })
      .then(userFound => {
        if (userFound) {
          if (compare(req.body.password, userFound.password)) {
            let token = sign({ _id: userFound._id, name: userFound.name, email: userFound.email })
            res.status(200).json({ token, name: userFound.name})
          } else {
            res.status(400).json({ msg: "Bad request1" })
          }
        } else {
          res.status(400).json({ msg: "Bad request2" })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

}

module.exports = userController
