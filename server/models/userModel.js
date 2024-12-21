const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

  fullname: {
    type: String,
    required: [true, 'Please provide your full name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!']
  },
  // address: {
  //   type: String,
  // },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number!'],
    // validate: [validator.isMobilePhone, 'Please provide a valid phone number!'],
    unique: true,
    minlength: 11,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
})

const User = mongoose.model('User', userSchema);

module.exports = User;