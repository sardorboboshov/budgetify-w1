const express = require('express');
const passport = require('passport');
const { IfUserExists } = require('../auth/guards');
const categoryController = require('../controllers/categoryController');

const auth = passport.authenticate('jwt', { session: false });

const router = express.Router();

router
  .route('/')
  .get(auth, IfUserExists, categoryController.getCategories)
  .post(auth, IfUserExists, categoryController.createCategory);

router
  .route('/:category_title')
  .patch(auth, IfUserExists, categoryController.updateCategory)
  .delete(auth, IfUserExists, categoryController.deleteCategory);

module.exports = router;
