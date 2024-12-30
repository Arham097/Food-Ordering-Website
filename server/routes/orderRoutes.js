const express = require('express');
const orderController = require('../controllers/orderController')

const router = express.Router();

router.route('/create')
  .post(orderController.createOrder)

router.route('/getOrders/:user')
  .get(orderController.getOrdersByUser)

router.route('/getOrder/all')
  .get(orderController.getAllOrders)

router.route('/updateStatus/:id/:status')
  .patch(orderController.updateOrderStatus);


module.exports = router;