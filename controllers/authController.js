/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const db = require('../auth/database');

exports.checkBody = (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.role) {
    return res.status(400).json({
      status: 'failed',
      message: 'you should enter email and password',
    });
  }
  next();
};

exports.checkBodyRegister = (req, res, next) => {
  if (!req.body.email || !req.body.password || !req.body.role) {
    return res.status(400).json({
      status: 'failed',
      message: 'you should enter email and password and the role of user',
    });
  }
  const ifUserExists = db.users.find((user) => user.email === req.body.email);
  if (ifUserExists) {
    return res.status(400).json({
      status: 'failed',
      message: 'user with that email exists already',
    });
  }
  next();
};

exports.login = (req, res) => {
  const user = db.loginUser(req.body.email, req.body.password);

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

exports.register = (req, res) => {
  const { email, password, role } = req.body;
  db.registerUser({ email, password, role });
  res.json(db.users);
};
