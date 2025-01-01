const express = require('express');
const path = require("path");
const menuController = require('../controllers/menuController');
const upload = require("../utils/multer");
const router = express.Router();

router.post('/upload', upload.single("menu_image"), menuController.menuUpload);

router.route('/getMenu')
  .get(menuController.getMenu)

module.exports = router;