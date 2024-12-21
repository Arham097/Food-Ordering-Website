const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/create-account')
  .post(userController.createAccount)

router.route('/update-account')
  .put(userController.updateAccount);



module.exports = router;