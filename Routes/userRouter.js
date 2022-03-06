const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.param('id', userController.checkId);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.checkBody, userController.createUser);
router.route('/:id').get(userController.getUser);
module.exports = router;
