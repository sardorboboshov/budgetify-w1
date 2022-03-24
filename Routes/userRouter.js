const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const { adminGuard } = require('../auth/guards');

const auth = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.param('id', userController.checkId);

router.route('/').get(auth, adminGuard, userController.getAllUsers);
router.route('/:id').get(userController.getUser);
module.exports = router;
