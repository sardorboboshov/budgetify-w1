/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
const fs = require('fs');

const dataOfUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/../mockData/mockData.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    dataOfUsers,
  });
};

exports.checkId = (req, res, next, val) => {
  if (!dataOfUsers[val]) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.user_name) {
    return res.status(400).json({
      status: 'failed',
      message: 'you should enter user_name',
    });
  }
  next();
};
exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  const user = dataOfUsers[id];
  res.status(200).json({
    status: 'success',
    user,
  });
};

exports.createUser = (req, res) => {
  const newId = dataOfUsers[dataOfUsers.length - 1].id + 1;
  const newUser = { id: newId, ...req.body };
  dataOfUsers.push(newUser);
  fs.writeFile(
    `${__dirname}/../mockData/mockData.json`,
    JSON.stringify(dataOfUsers),
    () => {
      res.status(201).json({
        status: 'success',
        newUser,
      });
    }
  );
};
