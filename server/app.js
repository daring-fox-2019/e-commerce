require('dotenv').config({path:'/home/qoyyima/Documents/Hacktiv8/phase2ke2/week3/day1/e-commerce-1/server/.env'})
const express     = require('express')
const app         = express()
const mongoose    = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes/index')
const PORT = 3000
const cors = require('cors')

mongoose.connect('mongodb://localhost/e-commerce-db'+process.env.NODE_ENV, {useNewUrlParser:true},function(){
    console.log('connected')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', router)


app.use(errorHandler)

app.listen(PORT, () => {
    console.log('listening on port 3000')
})

module.exports = app