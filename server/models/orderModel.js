const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerDetails: {
    fullname: {
      type: String,
      required: [true, 'Please provide the customer name!'],
    },
    address: {
      type: String,
      required: [true, 'Please provide the delivery address!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide the customer email!'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide the customer phone number!'],
    },
    specialInstructions: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ['Cash on Delivery', 'Credit/Debit Card'],
      required: [true, 'Please provide the payment method!'],
    },
  },
  orderDetails: {
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
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
