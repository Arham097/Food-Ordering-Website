
const User = require('../models/userModel')
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const jwt = require('jsonwebtoken')

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