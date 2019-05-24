const express = require("express")
const app = express()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const port = process.env.port || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'
const route = require('./routes/index')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ecommerce_' + NODE_ENV,{useNewUrlParser : true})

const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/carts')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/',route)

app.post('/carts',function(req,res){
    console.log('masuk post');
    
    Cart
        .create({
            products : req.body.products
        })
        .then(cart=>{
            res.status(200).json(cart)
        })
        .catch(err =>{
            res.status(500).json({
                msg: `internal server error`
            })
        })
})

app.delete('/carts/:id',function(req,res){
    Cart
        .findOneAndDelete({_id : req.params.id})
        .then(cart=>{
            res.status(201).json(cart)
        })
        .catch(err =>{
            res.status(500).json({
                msg : 'internal server error'
            })
        })
})

app.listen(port, ()=>{
    console.log(`listening to port: ${port}`);
})

module.exports = app;