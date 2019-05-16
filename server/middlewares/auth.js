const { verify } = require('../helpers/jwt');
const { User } = require('../models');

module.exports = {
  authenticate: function (req, res, next) {
    // console.log({ params: req.params, dari: 'authenticate' })
    let token = req.headers.token;
    if (!token) {
      next({ status: 401, message: 'You must login first to access this endpoint.', origin: 'Helpers authenticate' })
    } else {
      let decoded = verify(token, res);
      User
        .findOne({
          email: decoded.email
        })
        .then(user => {
          if (user) {
            req.user = user;
            next();
          } else {
            next({ status: 401, message: 'User invalid.', origin: 'Helpers authenticate'})
          }
        })
        .catch(err => {
          next({ status: 500, message: err.message, origin: 'Helpers authenticate'})
        })
    }
  },
  authorize: function (req, res, next) {
  },
}
