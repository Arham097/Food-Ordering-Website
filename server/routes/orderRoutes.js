const express = require('express');
const orderController = require('../controllers/orderController')

const router = express.Router();

router.route('/create')
  .post(orderController.createOrder)

router.route('/getOrders/:user')
  .get(orderController.getOrders)

module.exports = router;