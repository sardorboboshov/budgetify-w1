/* eslint-disable consistent-return */
const User = require('../models/users');

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    status: 'success',
    users,
  });
};

exports.checkId = async (req, res, next, val) => {
  const users = await User.find({});

  if (!users[val]) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getUser = async (req, res) => {
  const id = req.params.id * 1;
  const user = await User.find({ id });
  res.status(200).json({
    status: 'success',
    user,
  });
};
