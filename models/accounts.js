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
    owner: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      maxLength: 256,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('Account', accountSchema);
