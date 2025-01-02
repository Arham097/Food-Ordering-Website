const express = require('express');

const itemsController = require('../controllers/itemsController');
const upload = require("../utils/multer")

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

router.post('/add', upload.single("item_image"), itemsController.addItem);

router.route('/deleteItem/:id')
  .patch(itemsController.deleteItem);

router.route('/inactiveItem/:id')
  .patch(itemsController.inActiveItem);
module.exports = router;