const asyncErrorHandler = require("../utils/asyncErrorHandler");



const path = require("path");
const fs = require("fs").promises;
const CustomError = require("../utils/customError");

exports.menuUpload = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body); // Request body (non-file data)
  console.log(req.file); // Request file data

  // Ensure the file is uploaded
  if (!req.file) {
    const error = new CustomError("No file uploaded", 400);
    return next(error);
  }
  // If you need to do any extra operations, like saving file information in the database, you can do that here.
  return res.status(200).json({
    status: "success",
    data: {
      message: "File uploaded successfully",
    }
  });
});

exports.getMenu = asyncErrorHandler(async (req, res, next) => {
  const folder = path.join(__dirname, '../uploads');
  console.log(folder);
  const files = await fs.readdir(folder);
  if (files.length === 0) {
    const error = new CustomError("No file found", 404);
    return next(error);
  }
  const file = path.basename(files[0]);
  res.status(200).json({
    status: 'success',
    data: {
      file: file
    }
  })

});

