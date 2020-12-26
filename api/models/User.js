const mongoose = require('mongoose');
const valid = require('validator');
const Schema = mongoose.Schema
const userSchema = new Schema({
   name: {
      type: String,
      trim: true,
      required: true,
      minLength: 3
   },
   phone: {
      type: String,
      trim: true,
      required: true,
      unique: true
   },
   email: {
      type: String,
      trim: true,
      validate:{
         validator: (v) => {
            return valid.isEmail(v);
         },
         message: `{VALUE} is not a valid`
      }
   },
   password : String
})

const User = mongoose.model('User',userSchema)

module.exports = User