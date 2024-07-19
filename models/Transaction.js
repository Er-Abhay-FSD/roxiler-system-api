const mongoose = require('mongoose'); // CommonJS syntax

const transactionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true, lowercase: true, trim: true, index: true },
  description: { type: String, required: true, lowercase: true, trim: true, index: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  sold: { type: Boolean, required: true },
  dateOfSale: { type: Date, required: true }, // Use Date type for dates
}, 
{ timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction; // CommonJS syntax
