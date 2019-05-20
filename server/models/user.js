const mongoose = require("mongoose");
const bcrypt = require("../helpers/bcryptjs-helper");
const { Schema } = mongoose;
const DEFAULT_USER_PICTURE = "";
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [{
      validator: function(email) {
        return User.find({ _id: { $ne: this._id } })
          .then((members) => {
            const duplicate = members.filter(member => member.email === email.toLowerCase())[0];
            if (duplicate) return false;
          })
      },
      message: props => `Email ${props.value} has been taken already.`,
    }, {
      validator: function(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      },
      message: props => `Email is not valid`,
    }]
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: String,
    minlength: [10, "Min length: 10"],
    maxlength: [13, "Max length: 13"],
  },
  address: {
    type: String,
    // required: [true, "Address is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Min length: 6"],
  },
  displayPicture: {
    type: String,
    default: DEFAULT_USER_PICTURE,
  }
});

userSchema.pre("save", function(next) {
  this.email = this.email.toLowerCase();
  this.password = bcrypt.hashSync(this.password);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;