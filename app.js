/* eslint-disable prefer-destructuring */
/* eslint-disable comma-dangle */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { jwtCallback } = require('./auth/passport');
const usersRouter = require('./Routes/userRouter');
const loginRouter = require('./Routes/loginRouter');
const registerRouter = require('./Routes/registerRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, jwtCallback));

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
module.exports = app;
