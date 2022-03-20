/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../auth/database');
const User = require('../models/users');

exports.checkBody = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: 'failed',
      message: 'you should enter email and password',
    });
  }
  next();
};

exports.checkBodyRegister = async (req, res, next) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.role ||
    !req.body.user_name
  ) {
    return res.status(400).json({
      status: 'failed',
      message: 'you should enter email,password,username and the role of user',
    });
  }
  const ifUserExists = await User.find({ email: req.body.email });
  if (Object.keys(ifUserExists).length !== 0) {
    return res.status(400).json({
      status: 'failed',
      message: 'user with that email exists already',
    });
  }
  const emailIsValid = (email) => /[a-zA-Z0-9]@[a-zA-Z0-9]/.test(email);
  if (!emailIsValid(req.body.email)) {
    return res.status(400).json({
      status: 'failed',
      message: 'invalid email',
    });
  }
  next();
};

exports.login = async (req, res) => {
  const user = await db.loginUser(req.body.email, req.body.password);
  if (user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      token: `Bearer ${token}`,
    });
  } else {
    res.status(401).json({ message: 'Password or email is wrong' });
  }
};

exports.register = async (req, res) => {
  try {
    const users = await User.find({});
    const newUser = await User.create({
      id: users[users.length - 1].id + 1,
      user_name: req.body.user_name,
      email: req.body.email,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    await newUser.save();

    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({
      ...payload,
      token: `Bearer ${token}`,
    });
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
