require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const productRoutes = require('./routes/product-routes');
const userRoutes = require('./routes/user-route');
const categoryRoutes = require('./routes/category-routes');
const cartRoutes = require('./routes/cart-routes')
const transactionRoutes = require('./routes/transaction-routes')
const cors = require('cors');
const mongoose = require('mongoose');
const NODE_ENV = process.env.NODE_ENV || 'development';
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
        .then(()=> {
            console.log('connected online to atlas...');
            
        })
        .catch((err)=> {
            console.log(err);
        })

//UPON TESTING, PLEASE RUN THIS DATABASE URL
// mongoose.connect(`mongodb://localhost:27017/e-commerce_${NODE_ENV}`, {useNewUrlParser: true});

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)
app.use('/carts',cartRoutes)
app.use('/transactions',transactionRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app