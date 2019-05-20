const jwt = require(`jsonwebtoken`);
const Cart = require(`../models/cart`);
const {decodeToken} = require(`../helpers/token`);

function authentication(req, res, next) {
  try {
    let decoded = jwt.verify(req.headers.token, process.env.SECRET_JWT);
    next();
  } catch (err) {
    res.status(500).json({
      message: `Internal server error`
    });
  }
}

function authorization(req, res, next) {
  let condition = {
    _id: req.params.id,
    userId: req.headers.id
  };
  // console.log(`mencari data ini di authorization => ${condition}`);
  Cart.findOne(condition)
    .then(result => {
      // console.log(`dapat data ini => ${result}`);
      if (result) {
        next();
      } else {
        res.status(403).json({
          message: `authorization failed, you have no rights to access this`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Internal server error`
      });
    });
}

function adminAccess(req, res, next) {
  console.log("disini")
  if (decodeToken(req.headers.token).email == "admin@myos.com") {
    next();
  } else {
    res.status(403).json({
      message: `Restricted access,you have no rights to access this`
    });
  }
}

module.exports = {
  authentication,
  authorization,
  adminAccess
};
