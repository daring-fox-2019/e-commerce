require ('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const jwt = require ('jsonwebtoken')
const cors = require('cors')
const routes= require('./routes')
process.env.MONGO_TEST
process.env.MONGO_RUN
const url = process.env.MONGO_TEST
const uri = process.env.MONGO_RUN



// ON TESTING. PLEASE RUN THIS DATABASE
// mongoose.connect(url, {useNewUrlParser : true, useCreateIndex : true})
// .then(() => {console.log('===> MONGO DB TEST CONNECTED <===')})
// .catch((err) => console.log(err))

// UPON USING THE APPLICATION RUN THIS DATABASE INSTEAD
// mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex : true})
// .then(() => {console.log('===> MONGO DB LOCAL CONNECTED <===')})
// .catch((err) => console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.use('/', routes)
app.listen(port, () => {
    console.log('listening on', port)
})

module.exports = app;