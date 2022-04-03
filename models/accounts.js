const mongoose = require('mongoose');

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
    transactions: [
      {
        type: mongoose.ObjectId,
        ref: 'Transaction',
      },
    ],
    owner: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Account', accountSchema);
