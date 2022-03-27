const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');

const { adminGuard } = require('../auth/guards');

const auth = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.param('id', userController.checkId);

router.route('/').get(auth, adminGuard, userController.getAllUsers);

router
  .route('/:id/:account_id')
  .get(accountController.getAccount)
  .patch(accountController.updateAccount);
module.exports = router;

router
  .route('/:id')
  .get(userController.getUser)
  .patch(accountController.checkBodyAccount, accountController.createAccount);
