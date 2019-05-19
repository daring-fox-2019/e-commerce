const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoutes')
const userRoute = require('./routes/userRoutes')
const cartRoute = require('./routes/cartRoute')
const errHandling = require('./middlewares/errHandling')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

mongoose.connect('mongodb://localhost/ecommerce_'+ NODE_ENV, { useNewUrlParser:true }, (err)=>{
// mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser:true }, (err)=>{
    if(err) console.log(`Please make sure your database is ON`)
    else console.log(`Database Connected!`)
})

app.use('/products', productRoute)
app.use('/users', userRoute)
app.use('/carts', cartRoute)
app.use(errHandling)

app.listen(port, ()=>{
    console.log(`Server Running at port ${port}`)
})

module.exports = app