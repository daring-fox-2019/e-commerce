const User = require(`../models/user`);
const { comparePassword } = require(`../helpers/password`);
const { generateToken } = require(`../helpers/token`);

class cUser {
  static register(req, res) {
    console.log("register")
    User.create(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(err => {
        res.status(400).json({ message: `${err}` });
      });
  }
  static login(req, res) {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          if (comparePassword(req.body.password, user.password) === true) {
            let token = generateToken(user._id, user.email);
            let _id = user._id;
            let email = user.email;
            res.status(200).json({ token, _id, email });
          } else {
            res.status(400).json({ message: `password / email wrong :()` });
          }
        } else {
          res.status(400).json({ message: `password / email wrong` });
        }
      })
      .catch(err => {
        res.status(500).json({ message: `internal server error` });
      });
  }

  static update(req, res) {
    console.log("disini", req.params.id, req.headers.id)
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json({ message: `internal server error ${err}` });
      });
  }
}

module.exports = cUser;
