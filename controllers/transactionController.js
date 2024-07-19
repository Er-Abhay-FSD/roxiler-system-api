// controllers/transactionController.js
const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
  try {
    // Extract query parameters with default values
    const page = parseInt(req.query.page, 10) || 1;
    const perPage = parseInt(req.query.perPage, 10) || 10;
    const search = req.query.search || '';

    // Calculate the number of documents to skip based on page and perPage
    const skip = (page - 1) * perPage;

    // Create a regular expression for case-insensitive search
    const regex = new RegExp(search, 'i');

    // Build the query for searching
    const query = {
      $or: [
        { title: regex },
        { description: regex },
        { price: isNaN(search) ? { $exists: true } : search }
      ]
    };

    // Retrieve transactions with pagination
    const transactions = await Transaction.find(query)
      .skip(skip)
      .limit(perPage);

    // Count the total number of documents matching the query
    const total = await Transaction.countDocuments(query);

    // Send the response with transactions and total count
    res.status(200).json({ transactions, total });
  } catch (error) {
    console.error('Error retrieving transactions:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error retrieving transactions' });
  }
};

module.exports = { getTransactions };
