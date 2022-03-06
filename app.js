/* eslint-disable comma-dangle */
const express = require('express');
const usersRouter = require('./Routes/userRouter');

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

module.exports = app;
