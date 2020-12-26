const mongoose = require('mongoose');
const valid = require('validator');
const Schema = mongoose.Schema
const contactSchema = new Schema({
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
   }
})

const Contact = mongoose.model('Contact',contactSchema)

module.exports = Contact