/* eslint-disable prefer-destructuring */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const usersRouter = require('./Routes/userRouter');
const loginRouter = require('./Routes/loginRouter');
const registerRouter = require('./Routes/registerRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
module.exports = app;
