const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  customer: {
    name: {
      type: String,
      required: [true, 'Please provide the customer name!'],
    },
    address: {
      type: String,
      required: [true, 'Please provide the delivery address!'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide the customer phone number!'],
    },
    specialInstructions: {
      type: String,
    },
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
