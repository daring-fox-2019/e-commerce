const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    firstName : String,
    lastName : String,
    email : {
        type: String,
        required: [true, 'Email Required'],
        validate : [{
            validator: function(value){
                if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){
                    throw 'Invalid email format'
                }
            }
        },
            {
            validator : function(value){
                return User.find({
                    _id : {$ne: this._id},
                    email: value
                })
                .then(data =>{
                    if(data.length != 0){
                        throw 'Email has been taken'
                    }
                })
                .catch(err =>{
                    throw err
                })
            }
        }]
    },
    password : String
})

userSchema.pre('save',function(next){
    let user = this
    let salt = bcrypt.genSaltSync(8)
    let hash = bcrypt.hashSync(user.password,salt)
    user.password = hash
    next()
})

const User = mongoose.model('user',userSchema)

// User.schema.path('email').validate(function (input) {
//     User.findOne({email: input})
//       .then(found => {
//         if(found) {
//           return false
//         } else {
//           return true
//         }
//       })
//       .catch(err => {console.log(err)})
//   }, 'Email has been used.')

module.exports = User