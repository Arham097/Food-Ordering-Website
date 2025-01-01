const express = require('express');

const itemsController = require('../controllers/itemsController');


const router = express.Router();

router.route('/')
  .get(itemsController.getAllItems);

router.route('/sortedItems')
  .get(itemsController.getSortedItems);

router.route('/burgers')
  .get(itemsController.getBurgers);

router.route('/pizzas')
  .get(itemsController.getPizzas);

router.route('/drinks')
  .get(itemsController.getDrinks);

router.route('/chickens')
  .get(itemsController.getChickens);


module.exports = router;