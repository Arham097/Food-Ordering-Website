const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Menu = require("../models/menuModel");
const path = require("path");
const fs = require("fs").promises;
const CustomError = require("../utils/customError");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

exports.menuUpload = asyncErrorHandler(async (req, res, next) => {
  console.log(req.file);

  if (!req.file) {
    const error = new CustomError("No file uploaded", 400);
    return next(error);
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    public_id: 'Hasan Bites/Menu',
    folder: 'Hasan Bites/Menu',
    overwrite: true,
  })

  const menuUrl = result.secure_url;

  const menu = await Menu.findOneAndUpdate({ name: "menu" }, { url: menuUrl }, { new: true, upsert: true });

  return res.status(200).json({
    status: "success",
    data: {
      message: "File uploaded successfully",
      menu,
    }
  });
});

exports.getMenu = asyncErrorHandler(async (req, res, next) => {
  const menu = await Menu.find();
  if (menu.length === 0) {
    const error = new CustomError("No menu found", 404);
    return next(error);
  }
  res.status(200).json({
    status: "success",
    data: {
      menu,
    },
  });
});

