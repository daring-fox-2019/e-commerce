const express = require('express');
const router = express.Router();

const register = require('./register');
const login = require('./login');
// const google = require('./google');
const products = require('./products');

router.use('/register', register);
router.use('/login', login);
// router.use('/oauth/google', google);

router.use('/products', products);


module.exports = router;