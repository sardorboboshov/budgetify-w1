const User = require('../models/users');
const Account = require('../models/accounts');
const Transaction = require('../models/transactions');

// checkBody registerAccount for PATCH /:id

exports.checkBodyAccount = async (req, res, next) => {
  if (!req.body.account_name || !req.body.amount || !req.body.currency) {
    return res.json({
      status: 'failed',
      message: 'you should enter name,amount and currency for that account',
    });
  }
  next();
};

// checkBody for account: GET /:id/account_id, POST /:id/:account_id,...

exports.checkAccount = async (req, res, next) => {
  const { id, account_id } = req.params;
  const user = await User.findOne({ id });
  if (!user) {
    return res.json({ message: 'User not found' });
  }
  const { accounts } = user;
  const account = accounts[account_id];
  if (!account) {
    return res.json({ message: 'Account not found' });
  }
  next();
};

// create account for PATCH /:id

exports.createAccount = async (req, res) => {
  try {
    const user_id = req.params.id * 1;
    const user = await User.findOne({ id: user_id });
    const { accounts } = user;
    const AccountExists = await Account.findOne({
      owner: user_id,
      account_name: req.body.account_name,
    });
    if (AccountExists) {
      return res.json({ message: 'Account with this name already exists' });
    }
    const idOfNewAccount =
      accounts && accounts.length === 0
        ? 0
        : accounts[accounts.length - 1].account_id + 1;
    const newAccount = await Account.create({
      account_id: idOfNewAccount,
      account_name: req.body.account_name,
      amount: req.body.amount,
      currency: req.body.currency,
      owner: user_id,
      transactions: [],
    });
    await newAccount.save();
    await user.accounts.push(newAccount.id);
    await user.save();
    res.json({ message: 'Account created successfully', data: newAccount });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const { id, account_id } = req.params;
    const account = await Account.findOne({ owner: id, account_id });
    if (account) {
      return res.json({ account });
    }
    res.json({ status: 'fail', message: 'Account not found' });
  } catch (err) {
    res.json({ message: err.message });
  }
};
exports.updateAccount = async (req, res) => {
  try {
    const typesOfAccountElements = [
      'account_name',
      'amount',
      'currency',
      'transactions',
    ];
    const elements = Object.keys(req.body);
    elements.forEach((element) => {
      if (typesOfAccountElements.indexOf(element) === -1) {
        return res.status(400).json({
          message: `${element} is not a valid element for account`,
        });
      }
    });
    const account = await Account.findOneAndUpdate(
      {
        account_id: req.params.account_id,
      },
      req.body,
      { new: true }
    );

    await account.save();
    res.json({ account });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOne({
      account_id: req.params.account_id,
    });
    const user = await User.findOne({ id: req.params.id });
    await user.accounts.splice(req.params.account_id, 1);
    await account.remove();
    await user.save();
    await Transaction.deleteMany({ owner: req.params.account_id });
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ owner: req.params.id });
    res.json({ accounts });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = { ...exports };
