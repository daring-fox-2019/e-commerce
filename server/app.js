require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'
const cors = require('cors')

const mongoose = require('mongoose')

const DB = process.env.MONGODB_CONNECTION_URL || 'mongodb://localhost/e-commerce'
mongoose.connect(DB + NODE_ENV, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors())

const route = require('./routes/routes')

app.use('/', route)

app.listen(port, () => {
    console.log(`You are listening to ${port} FM`);
    console.log(`~~~Suara musik terkini~~~`);

})

module.exports = app