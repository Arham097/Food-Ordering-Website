const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the name of the item!'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide the price of the item!'],
  },
  description: {
    type: String,
    required: [true, 'Please provide the description of the item!'],
  },
  image: {
    type: String,
    required: [true, 'Please provide the image of the item!'],
    default: 'default.jpg',
  },
  category: {
    type: String,
    required: [true, 'Please provide the category of the item!'],
    enum: ['Pizzas', 'Burgers', 'Drinks', 'Chicken'],
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;