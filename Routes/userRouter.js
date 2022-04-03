const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const accountController = require('../controllers/accountController');
const transactionController = require('../controllers/transactionController');

const { adminGuard, userGuard } = require('../auth/guards');

const auth = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.param('id', userController.checkId);
router.param('account_id', auth, userGuard);
router.param('transaction_id', auth, userGuard);

router.route('/').get(auth, adminGuard, userController.getAllUsers);

router
  .route('/:id')
  .get(auth, userGuard, userController.getUser)
  .patch(auth, userGuard, userController.updateUser)
  .post(
    auth,
    userGuard,
    accountController.checkBodyAccount,
    accountController.createAccount
  )
  .delete(auth, userGuard, userController.deleteUser);

router
  .route('/:id/:account_id')
  .get(
    auth,
    userGuard,
    accountController.checkAccount,
    accountController.getAccount
  )
  .patch(
    auth,
    userGuard,
    accountController.checkAccount,
    accountController.updateAccount
  )
  .delete(
    auth,
    userGuard,
    accountController.checkAccount,
    accountController.deleteAccount
  )
  .post(
    auth,
    userGuard,
    accountController.checkAccount,
    transactionController.createTransaction
  );

router
  .route('/:id/:account_id/:transaction_id')
  .get(
    auth,
    userGuard,
    transactionController.checkTransaction,
    transactionController.getTransaction
  )
  .patch(
    auth,
    userGuard,
    transactionController.checkTransaction,
    transactionController.updateTransaction
  )
  .delete(
    auth,
    userGuard,
    transactionController.checkTransaction,
    transactionController.deleteTransaction
  );

module.exports = router;
