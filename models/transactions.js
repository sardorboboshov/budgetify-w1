const mongoose = require('mongoose');
const transactionSchema = require('./transactionSchema');

module.exports = mongoose.model('Transaction', transactionSchema);
