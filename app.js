require('dotenv').config({path: './.env'})
const express = require('express')
const app = express()
const PORT = 3000
const NODE_ENV = process.env.NODE_ENV || 'development';
// const route = require('./routes/routes')
const cors = require('cors')
const mongoose = require('mongoose')
const Product = require('./models/product')
const ProductController = require('./controllers/productController')

mongoose.connect('mongodb://localhost/e-commerce-' + NODE_ENV ,{ useNewUrlParser : true })


// app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/products', ProductController.findAll)
app.post('/products', ProductController.create)
app.get('/products/:id', ProductController.findOne)
app.put('/products/:id', ProductController.update)


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = app