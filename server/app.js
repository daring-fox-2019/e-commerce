require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const morgan = require('morgan')
const errorHandling = require('./middlewares/errorHandling')


app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


mongoose.connect(process.env.DB_ATLAS, { useNewUrlParser: true })
mongoose.connection.on('connected', function (err) {
   if( err ) {
      console.log( err )
   } else console.log('connect to database');
});

app.use('/', routes)
app.use(errorHandling)


app.listen(process.env.PORT, ( err )=> {
   if( err ) {
      console.log( err )
   } else 
   console.log(`listen on port ${process.env.PORT}`)
})

module.exports = app