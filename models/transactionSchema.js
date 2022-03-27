const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    createdAt: {
      required: true,
      type: Date,
      max: new Date().getTime(),
      default: new Date().getTime(),
    },
  },
  { timestamps: true }
);

module.exports = transactionSchema;
