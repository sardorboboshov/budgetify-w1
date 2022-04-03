const User = require('../models/users');
const Account = require('../models/accounts');
const Transaction = require('../models/transactions');

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json({
    status: 'success',
    users,
  });
};

exports.checkId = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      res.json({
        status: 'fail',
        message: 'Invalid ID',
      });
    } else {
      next();
    }
  } catch (err) {
    res.json({
      message: 'user not found',
    });
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id * 1;
  const user = await User.find({ id });
  res.json({
    status: 'success',
    user,
  });
};

exports.updateUser = async (req, res) => {
  try {
    const typesOfUserElements = ['user_name', 'email'];
    const elements = Object.keys(req.body);
    elements.forEach((element) => {
      if (!typesOfUserElements.includes(element)) {
        return res.json({
          status: 'fail',
          message: `${element} is not a valid field`,
        });
      }
    });
    const user = await User.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    await user.save();
    res.json({ user });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    await Account.deleteMany({ owner: user.id });
    await Transaction.deleteMany({ user_owner: user.id });
    await user.remove();
    res.json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};
