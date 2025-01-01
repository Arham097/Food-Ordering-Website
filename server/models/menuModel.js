const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "menu",
  },
  url: {
    type: String,
    required: [true, 'Please provide the url!'],
  }
});

const menu = mongoose.model('Menu', menuSchema);

module.exports = menu;