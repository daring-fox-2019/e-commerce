const mongoose = require('mongoose')

let itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `Title required.`],
  },
  description: String,
  price : {
      type : Number,
      min: [1, 'Price minimal : 1'],
      required:[true,'Price required']
  },
  kategori : {
    type: String,
    required: [true, `Kategori required.`],
  },
  mainPage : {
    type : Boolean,
    default : false
  },
  stock :{
    type : Number,
    min: [1, 'Stock minimal : 1'],
    required:[true,'Stock required']
},
  image : {
    type : String,
    required : [true,'Image required']
  }
})

let Item = mongoose.model('Item', itemSchema)


module.exports = Item