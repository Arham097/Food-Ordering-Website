const express = require('express');
const multer = require('multer');
const path = require("path");
const menuController = require('../controllers/menuController');

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, "menu_image" + path.extname(file.originalname)); // Set filename with timestamp
  }
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/upload', upload.single("menu_image"), menuController.menuUpload);
router.route('/getMenu')
  .get(menuController.getMenu)

module.exports = router;