require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const NODE_ENV = process.env.NODE_ENV || 'development';
const eCommerceRoutes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost/e-commerce-${NODE_ENV}`, { useNewUrlParser: true })
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use('/', eCommerceRoutes)
app.listen(port, function(){
    console.log(`listening on port ${port}`);
    
})

// module.exports = app
