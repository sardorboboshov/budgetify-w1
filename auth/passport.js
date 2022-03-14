const db = require('./database');

const jwtCallback = (jwtPayload, done) => {
  const user = db.getUserByEmail(jwtPayload.email);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
};

module.exports = {
  jwtCallback,
};
