const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Helper = require('../helpers/helper.js')

UserSchema = new Schema({
    name : {
        required : true,
        type : String
    },
    address : Object,
    email : {
        required : true,
        type : String,
    },
    password: {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    }
})

UserSchema.pre('save',function(next){
    this.password = Helper.generateHashPass(this.password)
    next()
})

UserSchema.path('email').validate(function(value){
    return User.findOne({email:value})
    .then(data => {
        if(data){
            return Promise.resolve(false)
        } else {
            return Promise.resolve(true)
        }
    })
},`email already in use`)

UserSchema.path('email').validate(function(value){
    return /\w{4,}\@\w{3,}\.\w{2,}/.test(value)
}, 'email must valid format')

const User = mongoose.model('User',UserSchema)

module.exports = User