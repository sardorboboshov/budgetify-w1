const jwt = require('jsonwebtoken');
const User = require('../models/users');

const adminGuard = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized1' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const userGuard = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    const requestedUser = await User.findOne({ id: req.params.id });
    if (user && requestedUser && user.id === requestedUser.id) {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized2' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  adminGuard,
  userGuard,
};
