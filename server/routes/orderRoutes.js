const express = require('express');
const orderController = require('../controllers/orderController')

const router = express.Router();

router.route('/create')
  .post(orderController.createOrder)

router.route('/getOrders/:user')
  .get(orderController.getOrdersByUser)

router.route('/getOrder/all')
  .get(orderController.getAllOrders)

router.route('/getOrder/pending')
  .get(orderController.getPendingOrders)

router.route('/getOrder/inprogress')
  .get(orderController.getInprogressOrders)
router.route('/getOrder/completed')
  .get(orderController.getCompletedOrders)

router.route('/getOrder/delivered')
  .get(orderController.getDeliveredOrders)
module.exports = router;