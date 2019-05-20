require('dotenv').config();

const express  = require('express');
const app      = express();
const cors     = require('cors');
const morgan   = require('morgan');
const mongoose = require('mongoose');
const routes   = require('./routes');
const PORT     = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development'

mongoose.connect(`mongodb://localhost/e-commerce-${NODE_ENV}`, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true)


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

module.exports = app;

app.listen(PORT, () => {
    console.log('🎁 App listening on port:', PORT);
});