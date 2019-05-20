const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

let tagSchema = new Schema({
    name: { type: String, required: true }
}, { timestamps: true })

let Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag

