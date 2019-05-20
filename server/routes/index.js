const route = require('express').Router()
const { ControllerUser } = require('../controllers')
const { ControllerItem } = require('../controllers')
const { ControllerCart } = require('../controllers')
const { ControllerTransaction } = require('../controllers')
const { authenticate } = require('../middlewares/auth')
const { authorize } = require('../middlewares/auth')
const images = require('../helpers/images')

route.get('/authenticate',authenticate,(req,res) =>{
    res.status(200).json()
})
route.get('/',(req,res)=>{ res.status(200).json({ message : 'Home' })})
route.post('/user/register',ControllerUser.create)
route.post('/user/login',ControllerUser.login)
route.post('/items',
    images.multer.single('image'),
    images.sendUploadToGCS,
    ControllerItem.create)
route.get('/items',ControllerItem.findAll)
route.get('/items/:id',ControllerItem.findOne)
route.put('/items/:id',
    images.multer.single('image'),
    images.sendUploadToGCS,
    ControllerItem.update)
route.delete('/items/:id',ControllerItem.delete)
route.post('/cart',authenticate,ControllerCart.create)
route.get('/cart',authenticate,ControllerCart.findAll)
route.put('/cart/:id',ControllerCart.update)
route.delete('/cart/:id',authenticate,ControllerCart.delete)
route.post('/transaction',authenticate,ControllerTransaction.create)
module.exports = route
