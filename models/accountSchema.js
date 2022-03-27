const mongoose = require('mongoose');
const transactionSchema = require('./transactionSchema');

const accountSchema = new mongoose.Schema(
  {
    account_id: {
      required: true,
      type: Number,
    },
    account_name: {
      required: true,
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    incomes: [transactionSchema],
    expenses: [transactionSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = accountSchema;
