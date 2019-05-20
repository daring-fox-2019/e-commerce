require('dotenv').config({path: './.env'})
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'developmennt'
const mongoose = require('mongoose');
const route = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(route)

mongoose.connect('mongodb://localhost/ecommerce' + NODE_ENV,{ useNewUrlParser : true });

app.listen(port,() => {
  console.log(`listening on port: ${port}!`)
})
