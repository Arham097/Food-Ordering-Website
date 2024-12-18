const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/create-account')
  .post(userController.createAccount)




module.exports = router;