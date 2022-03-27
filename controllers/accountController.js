/* eslint-disable consistent-return */
const User = require('../models/users');
const Account = require('../models/accounts');

// checkBody registerAccount for PATCH /:id

exports.checkBodyAccount = async (req, res) => {
  if (!req.body.account_name || !req.body.amount || !req.body.currency) {
    return res.status(400).json({
      status: 'failed',
      message: 'you should enter name,amount and currency for that account',
    });
  }
  next();
};

// create account for PATCH /:id

exports.createAccount = async (req, res) => {
  try {
    const user_id = req.params.id * 1;
    const user = await User.findOne({ id: user_id });
    const { accounts } = user;
    const idOfNewAccount =
      accounts.length === 0 ? 0 : accounts[accounts.length - 1].account_id + 1;
    const newAccount = await Account.create({
      account_id: idOfNewAccount,
      account_name: req.body.account_name,
      amount: req.body.amount,
      currency: req.body.currency,
      incomes: [],
      expenses: [],
    });
    await newAccount.save();
    await user.accounts.push(newAccount);
    await user.save();
    res.json({ message: 'Account created successfully', data: newAccount });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const { id, account_id } = req.params;
    const user = await User.findOne({ id });
    if (!user) {
      return res.json({ message: 'User not found' });
    }
    const { accounts } = user;
    const account = accounts.find(
      (account_) => account_.account_id * 1 === account_id * 1
    );
    if (!account) {
      return res.json({ message: 'Account not found' });
    }
    res.json({ message: 'Account Found', data: { account } });
  } catch (err) {
    res.json({ message: err.message });
  }
};
exports.updateAccount = async (req, res) => {
  try {
    const account = await Account.findOne({
      account_id: req.params.account_id,
    });
    account.account_name = 'bla bla card';
    await account.save();
    res.json({ account });
  } catch (err) {
    res.json({ message: err.message });
  }
};
