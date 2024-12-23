const Order = require('../models/orderModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/customError');

exports.createOrder = asyncErrorHandler(async (req, res) => {
  const newOrder = await Order.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      order: newOrder
    }
  })
})

exports.getOrders = asyncErrorHandler(async (req, res, next) => {
  const user = req.params.user;
  console.log(user);
  const orders = await Order.find({ user }).populate('orderDetails.items.item');
  if (!orders) {
    const error = new CustomError('No orders found', 404);
    return next(error);
  }
  res.status(200).json({
    status: 'success',
    data: {
      orders
    }
  })
})