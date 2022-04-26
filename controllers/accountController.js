const User = require('../models/users');
const Account = require('../models/accounts');
const Transaction = require('../models/transactions');

// checkBody registerAccount for POST /:id

exports.checkBodyAccount = async (req, res, next) => {
  if (!req.body.account_name || !req.body.currency) {
    return res.json({
      status: 'failed',
      message: 'you should enter title and currency for that account',
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
  // const { accounts } = user;
  const account = await Account.findOne({
    account_id,
    owner: id,
  });
  if (!account) {
    return res.json({ message: 'Account not found' });
  }
  next();
};

exports.checkAccount2 = async (req, res, next) => {
  try {
    const { id, account_id } = req.params;
    const user = await User.findOne({ id });
    if (!user) {
      return res.json({ message: 'User not found' });
    }
    const accounts = await Account.find({ owner: id });
    const account = accounts[account_id];
    if (!account) {
      return res.json({ message: 'Account not found' });
    }
    next();
  } catch (err) {
    res.json({ message: err.message });
  }
};

// create account for POST /:id

exports.createAccount = async (req, res) => {
  try {
    const user_id = req.params.id * 1;
    const accounts = await Account.find({ owner: user_id });
    const AccountExists = await Account.findOne({
      owner: user_id,
      account_name: req.body.account_name.toLowerCase(),
    });
    if (AccountExists) {
      return res
        .status(400)
        .json({ message: 'Account with this title already exists' });
    }
    const idOfNewAccount =
      accounts && accounts.length === 0
        ? 0
        : accounts[accounts.length - 1].account_id + 1;
    const newAccount = await Account.create({
      account_id: idOfNewAccount,
      account_name: req.body.account_name.toLowerCase(),
      amount: 0,
      currency: req.body.currency,
      owner: user_id,
      transactions: [],
      description: req.body.description,
    });
    await newAccount.save();
    res.json({ message: 'Account created successfully', data: newAccount });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const { id, account_id } = req.params;
    const accounts = await Account.find({ owner: id });
    const account = accounts[account_id];
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
    const typesOfAccountElements = ['account_name', 'description'];
    const elements = Object.keys(req.body);
    elements.forEach((element) => {
      if (typesOfAccountElements.indexOf(element) === -1) {
        return res.status(400).json({
          message: `${element} is not a valid element for account`,
        });
      }
    });
    const accounts = await Account.find({ owner: req.params.id });
    const account = accounts[req.params.account_id];
    if (req.body.account_name) {
      account.account_name = req.body.account_name;
    }
    if (req.body.description) {
      account.description = req.body.description;
    }
    await account.save();
    res.json({ account });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const accounts = await Account.find({
      owner: req.params.id,
    });
    const account = accounts[req.params.account_id];
    await account.remove();
    await Transaction.deleteMany({
      owner: req.params.account_id,
      user_owner: req.params.id,
    });
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.log(err);
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

exports.getAccountCurrency = async (req, res) => {
  try {
    const account = await Account.findOne({
      account_id: req.params.account_id,
      owner: req.params.id,
    });
    res.json({ currency: account.currency });
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = { ...exports };
