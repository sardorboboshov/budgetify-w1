/* eslint-disable comma-dangle */
const bcrypt = require('bcrypt');
const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../mockData/mockData.json`)
);

function registerUser(user) {
  const newUser = {
    id: Math.random(),
    email: user.email,
    password: bcrypt.hashSync(user.password, 10),
    role: user.role,
  };
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/../mockData/mockData.json`,
    JSON.stringify(users),
    () => {}
  );
}

function getUserByEmail(email) {
  return users.find((user) => user.email === email);
}

function loginUser(email, password) {
  const user = getUserByEmail(email);
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}

module.exports = {
  users,
  loginUser,
  getUserByEmail,
  registerUser,
};
