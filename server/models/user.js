const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {hash} = require('../helpers/bcrypt')
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [
            {
                validator(email) {
                    return User.findOne({email})
                    .then(found => {
                        if(found) return false;
                    })
                },
                message: 'Email is registered'
            }, 
            {
                validator(email) {
                    const regex = /\S+@\S+\.\S+/
                    return regex.test(email)
                },
                message: 'Please use valid email address'
        }]
    },
    password : {
        type: String,
        required: [true, 'password is required']
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    role : {
        type: String,
        default: 'user',
    },
    cart: [{type: Schema.Types.ObjectId, ref: 'Cart'}]
});

userSchema.pre('save', function(next) {
    this.password = hash(this.password)
    if(this.role) this.role = hash(this.role)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User