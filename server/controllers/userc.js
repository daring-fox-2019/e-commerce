const User = require(`../models/user`);
const { comparePassword } = require(`../helpers/password`);
const { generateToken } = require(`../helpers/token`);

class cUser {
  static register(req, res) {
    User.create(req.body)
      .then(created => {
        res.status(201).json(created);
      })
      .catch(err => {
        res.status(500).json({ message: `internal server error` });
      });
  }
  static login(req, res) {
    User.findOne(req.body)
      .then(User => {
        if (user) {
          if (comparePassword(req.body.password, user.password) === true) {
            let token = generateToken(user._id, user.email);
            let id = user._id;
            let email = user.email
            res.status(200).json({ token, id, email });
          } else {
            res.status(200).json({ message: `password / email wrong` });
          }
        } else {
          res.status(200).json({ message: `password / email wrong` });
        }
      })
      .catch(err => {
          res.status(500).json({message : `internal server error`})
      });
  }
}

module.exports = cUser;
