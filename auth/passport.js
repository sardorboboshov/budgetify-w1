const User = require('../models/users');

const jwtCallback = async (jwtPayload, done) => {
  const user = await User.findOne({ email: jwtPayload.email });
  if (user) {
    return done(null, user);
  }
  return done(null, false);
};

module.exports = {
  jwtCallback,
};
