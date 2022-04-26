const Account = require('../models/accounts');
const Transaction = require('../models/transactions');

exports.checkTransaction = async (req, res, next) => {
  try {
    const { transaction_id, account_id, id } = req.params;
    const transaction = await Transaction.findOne({
      transaction_id,
      owner: account_id,
      user_owner: id,
    });
    if (!transaction) {
      return res.json({ message: 'Transaction not found' });
    }
    next();
  } catch (err) {
    return res.json({
      message: 'Account not found',
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { transaction_id, account_id, id } = req.params;
    const transaction = await Transaction.findOne({
      owner: account_id,
      user_owner: id,
      transaction_id,
    });
    if (!transaction) {
      return res.json({
        status: 'fail',
        message: 'Transaction not found',
      });
    }
    res.json({
      status: 'success',
      transaction,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { id, account_id } = req.params;
    const accounts = await Account.find({
      owner: id,
    });
    const account = accounts[account_id];
    const { currency } = account;
    const transactions = await Transaction.find({
      owner: account_id,
      user_owner: id,
    });
    const transaction_id =
      transactions && transactions.length === 0
        ? 0
        : transactions[transactions.length - 1].transaction_id + 1;
    const { title, category, amount, description, type, createdAt } = req.body;
    const newTransaction = await Transaction.create({
      transaction_id,
      type,
      title,
      category,
      amount,
      description,
      owner: account_id,
      user_owner: id,
      currency,
      createdAt,
    });
    await newTransaction.save();
    if (type === 'expense') {
      account.amount -= newTransaction.amount;
    } else {
      account.amount += newTransaction.amount;
    }
    await account.save();
    res.json({
      message: 'Transaction created successfully',
      data: { newTransaction },
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const typesOfTransactionElements = [
      'title',
      'category',
      'amount',
      'description',
      'createdAt',
    ];
    const elements = Object.keys(req.body);
    elements.forEach((element) => {
      if (typesOfTransactionElements.indexOf(element) === -1) {
        return res.json({
          message: `${element} is not a valid element for transaction`,
        });
      }
    });
    if (req.body.amount) {
      const transaction = await Transaction.findOne({
        transaction_id: req.params.transaction_id,
        owner: req.params.account_id,
        user_owner: req.params.id,
      });
      const account = await Account.findOne({
        owner: req.params.id,
        account_id: req.params.account_id,
      });
      if (transaction.type === 'expense') {
        account.amount += transaction.amount - Number(req.body.amount);
      } else {
        account.amount -= transaction.amount - Number(req.body.amount);
      }
      await account.save();
    }
    const transaction = await Transaction.findOneAndUpdate(
      {
        transaction_id: req.params.transaction_id,
        owner: req.params.account_id,
        user_owner: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    );
    if (!transaction) {
      return res.json({ message: 'Transaction not found' });
    }
    await transaction.save();
    res.json({ transaction });
  } catch (err) {
    res.json({ message: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      transaction_id: req.params.transaction_id,
      owner: req.params.account_id,
      user_owner: req.params.id,
    });
    const accounts = await Account.find({
      owner: req.params.id,
    });
    const account = accounts[req.params.account_id];
    if (transaction.type === 'expense') {
      account.amount += transaction.amount;
    } else {
      account.amount -= transaction.amount;
    }
    await account.save();
    await transaction.remove();
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    return res.json({ message: err.message });
  }
};

exports.getAllTransActions = async (req, res) => {
  try {
    const { id, account_id } = req.params;
    const transactions = await Transaction.find({
      owner: account_id,
      user_owner: id,
    });
    res.json({
      transactions,
    });
  } catch (err) {
    return res.json({ message: err.message });
  }
};
