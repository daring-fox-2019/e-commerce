require('dotenv').config({path:'/home/qoyyima/Documents/Hacktiv8/phase2ke2/week3/day1/e-commerce-1/server/.env'})
const express     = require('express')
const app         = express()
const mongoose    = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes/index')
const PORT = process.env.PORT
const cors = require('cors')

mongoose.connect(process.env.MONGO_DB+process.env.NODE_ENV, {useNewUrlParser:true},function(){
    console.log('connected')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', router)


app.use(errorHandler)

app.listen(PORT, () => {
    console.log('listening on port '+PORT)
})

module.exports = app