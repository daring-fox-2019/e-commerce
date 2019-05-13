require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const productRoutes = require('./routes/product-routes');
const userRoutes = require('./routes/user-route');
const cors = require('cors');
const mongoose = require('mongoose');
const NODE_ENV = process.env.NODE_ENV || 'development';
mongoose.connect(`mongodb://localhost/e-commerce_${NODE_ENV}`, { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/users', userRoutes)
app.use('/products', productRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app