const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    validate: {
      validator: (type) => type === 'income' || type === 'expense',
      message: 'Invalid category type',
    },
  },
  title: {
    type: String,
    required: true,
  },
  category_id: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Category', categorySchema);
