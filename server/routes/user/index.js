const route = require('express').Router()
const userController = require('../../controllers/userController')

route.post('/signUp', userController.signUp)
route.post('/signIn', userController.signIn)
route.get('/',(req,res) => {
    res.send('masuk di route user')
})

module.exports = route