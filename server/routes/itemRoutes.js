const express = require('express');

const itemsController = require('../controllers/itemsController');
const upload = require("../utils/multer")

const router = express.Router();

router.route('/')
  .get(itemsController.getAllItems);

router.route('/getItem/:id')
  .get(itemsController.getItemByID);

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

router.route('/toggleActiveItem/:id')
  .patch(itemsController.toggleActiveItem);

router.patch('/editItem/:id', upload.single("item_image"), itemsController.editItem);

module.exports = router;