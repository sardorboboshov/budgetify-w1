const bcrypt = require('bcrypt');
const User = require('../models/users');

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}

module.exports = {
  loginUser,
};
