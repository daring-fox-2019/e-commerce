const { generateHash, compareHash } = require('../helper')
const Model = require('../models/user')
var jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


class UserController {

  static registrasi(req, res) {
    console.log(req.body);
    let input = {
      email: req.body.email,
      password: generateHash(req.body.password),
      username : req.body.username
    }
    console.log(input);
    Model
      .create(input)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })

  }

  static signin(req, res) {
    Model.findOne({ email: req.body.email })
      .then(user => {
        let cekPass = false
        if (user) {
          cekPass = compareHash(req.body.password, user.password)
        }

        if (!cekPass) {
          res.status(400).json({ message: 'invalid username or password' })
        } else {
          let token = jwt.sign({ email: user.email, _id: user._id, role: user.role }, process.env.SECRET);
          console.log(token); 
          let dataUser = {
            token,
            email : user.email,
            id : user._id,
            role : user.role
          }
          res.status(200).json({ dataUser })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static googleSignin(req, res) { 
    var newEmail = ''
    client.verifyIdToken({
      idToken: req.headers.token,
      audience: process.env.CLIENT_ID
    })
      .then(function (ticket) {
        newEmail = ticket.getPayload().email
        return Model.findOne({
          email: newEmail
        })
      })
      .then(function (userLogin) {
        console.log('masuk ke then 2')
        if (!userLogin) {
          return Model.create({
            email: newEmail,
            password: 'password',
            projects: []
          })
        } else {
          return userLogin
        }
      })
      .then(function (newUser) {
        console.log('masuk ke then 3')
        let token = jwt.sign({ email: newUser.email, _id: newUser._id, projects: newUser.projects }, process.env.SECRET);
        res.status(200).json({ token })
      })
      .catch(function (err) {
        console.log(err)
        res.status(500).json(err)
      })
  }

}

module.exports = UserController