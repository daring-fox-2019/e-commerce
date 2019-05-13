require('dotenv').config({path: './.env'})
const express = require('express')
const app = express()
const port = 3000
const route = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
const error = require('./middlewares/error')
mongoose.connect('mongodb://localhost:27017/e-commerce',{ useNewUrlParser : true, useFindAndModify: false }, (err) => {
  // if(err) console.log('Failed connecting to database.')
  // else console.log('Success connecting to database!')
})

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(route)
app.use(error)

app.listen(port,() => {
  // console.log(`listening on port: ${port}!`)
})

module.exports = app