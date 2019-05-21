const express = require('express')
const router =  express.Router()
const userRouter = require('./user')
const productRouter = require('./product')

// router.get('/',(req,res)=>{
//   res.send(`masuk ke halaman index`)
// })

router.use('/users',userRouter)
router.use('/products', productRouter)

module.exports = router