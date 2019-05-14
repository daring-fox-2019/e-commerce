const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.js');


router.post('/', UserController.register);


module.exports = router;