// controllers/initializeController.js

const axios = require('axios');
const Transaction = require('../models/Transaction');

const initializeDatabase = async (req, res) => {
  try {
    // Fetch data from third-party API
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    // Log the data to verify its structure
    console.log('Fetched transactions:', transactions);

    // Ensure transactions is an array of objects matching the schema
    if (!Array.isArray(transactions) || transactions.some(tx => !tx.title || !tx.price || !tx.dateOfSale)) {
      return res.status(400).json({ message: 'Invalid data format' });
    }

    // Clear existing data (optional)
    await Transaction.deleteMany({});

    // Insert the new data
    await Transaction.insertMany(transactions);

    res.status(201).json({ message: 'Database initialized with seed data' });
  } catch (error) {
    console.error('Error initializing database:', error.message);
    res.status(500).json({ message: 'Error initializing database' });
  }
};

module.exports = { initializeDatabase };
