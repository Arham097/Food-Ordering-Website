const User = require('../models/userModel')
const asyncErrorHandler = require('../utils/asyncErrorHandler')

exports.createAccount = asyncErrorHandler(async (req, res) => {
  console.log(req.body);
  const newUser = await User.create(req.body);
  console.log(newUser);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  })

})