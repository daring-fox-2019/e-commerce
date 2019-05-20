const mongoose = require('mongoose')
const Schema = mongoose.Schema

let moreThanZero = function(number){
    if(number > 0) return true
    else return false
}

let productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please fill in name of product"]
    },
    image: {
        type: String,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        validate: [
            {validator: moreThanZero, msg: "Please input price at least more than zero"}
        ]
    },
    stock: {
        type: Number,
        validate: [
            {validator: moreThanZero, msg: "Please input stock at least more than zero"}
        ]
    },
    category: {
        type: String,
        required: [true, "Please input category of product"]
    }
})

let Product = new mongoose.model("Product", productSchema)

module.exports = Product