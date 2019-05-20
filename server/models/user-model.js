const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    email:{
        type:String,
        required:[true,'both field is required'], 
        validate: [ {
            validator: function(email){
                let regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                return regex.test(email);
            },
            message: "invalid email"
            },
            { 
            validator: function(input){
                return mongoose.model('User',userSchema)
                    .findOne({
                        _id:{$ne:this._id},
                        email:input
                    })
                    .then(data => {
                        if(data){
                            return false
                        }
                })
            },
            message:'Email is already registered'}
        ]
    },
    password:{
        type:String,
        required:[true,'both field is required']
    },
    role: {
        type: String,
        default: 'user'
    }
})

userSchema.post('validate',function(input){
    input.password = hash(input.password)
    if (input.email == process.env.ADMIN_EMAIL) {
        input.role = 'admin'
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User