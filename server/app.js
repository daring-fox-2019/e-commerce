require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const mongoose = require('mongoose');
const cors = require('cors')

app.use(cors())
mongoose.set('useFindAndModify', false);
// mongoose.connect('mongodb://localhost/richiebaby', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://admin:root@cluster0-r5gmo.gcp.mongodb.net/richiebaby?retryWrites=true', { useNewUrlParser: true });


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})

module.exports = app;