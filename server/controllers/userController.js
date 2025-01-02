
const User = require('../models/userModel')
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const jwt = require('jsonwebtoken')
const CustomError = require('../utils/customError')

const signUpToken = id => {
  return jwt.sign({ id }, process.env.SECRET_STRING, {
    expiresIn: Number(process.env.LOGIN_EXPIRES)
  })
}

const options = {
  maxAge: process.env.LOGIN_EXPIRES,
  httpOnly: true,
}

if (process.env.NODE_ENV === 'production') {
  options.secure = true;
}

const createSendToken = (user, statusCode, res) => {
  const token = signUpToken(user._id);
  res.cookie('jwt', token, options);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  })
}

exports.createAccount = asyncErrorHandler(async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  if (email === "arhamhasan70@gmail.com") {
    req.body.role = "admin";
  }
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
})

exports.updateAccount = asyncErrorHandler(async (req, res) => {
  const { id, fullname, email, phone } = req.body;
  const user = await User.findByIdAndUpdate(id, { fullname, email, phone }, {
    new: true,
    runValidators: true
  });
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found'
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

exports.deleteAccount = asyncErrorHandler(async (req, res, next) => {
  const { _id } = req.query;
  if (!_id) {
    const error = new CustomError("User Id Required", 400);
    return next(error);
  }
  const user = await User.findByIdAndDelete(_id);
  if (!user) {
    const error = new CustomError("User not found", 404);
    return next(error);
  }
  console.log(user);

  res.status(204).json({
    status: "success",
    data: null
  })
})