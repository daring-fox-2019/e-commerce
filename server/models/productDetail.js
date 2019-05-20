const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

let productDetailSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },          
    image: String,
    price: Number,
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
}, { timestamps: true })

let ProdDetail = mongoose.model('Detail', productDetailSchema)

module.exports = ProdDetail

