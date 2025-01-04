const { getIO, getClients } = require('../utils/socket');
const Order = require('../models/orderModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/customError');

exports.createOrder = asyncErrorHandler(async (req, res) => {
  const newOrder = await Order.create(req.body);
  const io = getIO();
  io.emit('newOrder', newOrder);
  res.status(201).json({
    status: 'success',
    data: {
      order: newOrder
    }
  })
})

exports.getOrdersByUser = asyncErrorHandler(async (req, res, next) => {
  const user = req.params.user;
  console.log(user);
  const orders = await Order.find({ user }).populate('orderDetails.items.item').sort({ 'orderDetails.orderDate': -1 });

  if (!orders || orders.length === 0) {
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

exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {
  const orders = await Order.find().populate('orderDetails.items.item').sort({ 'orderDetails.orderDate': -1 });
  if (!orders || orders.length === 0) {
    const error = new CustomError('No orders found', 404);
    return next(error);
  }
  res.status(200).json({
    status: 'success',
    count: orders.length,
    data: {
      orders
    }
  })
});

exports.updateOrderStatus = asyncErrorHandler(async (req, res, next) => {
  const { id, status } = req.params;
  try {
    const io = getIO();
    const clients = getClients();

    const order = await Order.findByIdAndUpdate(id, { 'orderDetails.status': status }, { new: true });
    if (!order) {
      const error = new CustomError("No Order found with this Id", 404);
      return next(error);
    }

    const user = order.user.toString();

    if (clients.has(user)) {
      console.log(clients.get(user));
    }
    if (clients.has(user)) {
      io.to(clients.get(user)).emit('orderStatusUpdated', order);
    }

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    return next(new CustomError("Socket.io is not initialized or clients map is unavailable.", 500));
  }
})
