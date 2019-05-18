const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { hashPassword } = require("../helpers/password");

const UserSchema = new Schema({
  email: {
    type: String,
    validate: [
      {
        validator: strEmail => {
          let re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(strEmail).toLowerCase());
        },
        message: "please input a valid email address"
      },
      {
        validator: strEmail => {
          return new Promise((resolve, reject) => {
            this.model("User")
              .findOne({
                email: strEmail
              })
              .then(result => {
                if (result) {
                  throw new Error("email already been used");
                } else {
                  resolve();
                }
              })
              .catch(err => {
                reject(err);
              });
          });
        },
        message: "that email already been used"
      }
    ]
  },
  password: {
    type: String,
    minlength: [8, "password must be 8 character"],
    required: true
  }
});

UserSchema.pre("save", next => {
  this.password = hashPassword(this.password);
  next();
});

const Users = mongoose.model("User", UserSchema);
module.exports = Users;
