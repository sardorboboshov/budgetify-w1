const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validate: {
        validator: (type) => type === 'income' || type === 'expense',
        message: 'Invalid transaction type',
      },
    },
    category: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    owner: {
      type: Number,
      required: true,
    },
    user_owner: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    createdAt: {
      required: true,
      type: Date,
      max: new Date().getTime(),
      default: new Date().getTime(),
    },
    transaction_id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model('Transaction', transactionSchema);
