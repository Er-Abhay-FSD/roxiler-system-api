// routes/api.js
const express = require('express');
const { initializeDatabase } = require('../controllers/initializeController');
const { getTransactions } = require('../controllers/transactionController');
const { getStats } = require('../controllers/statsController');
const { getBarChart, getPieChart } = require('../controllers/chartController');
const { getCombinedData } = require('../controllers/combinedController');

const router = express.Router();

router.get('/initialize', initializeDatabase);
router.get('/transactions', getTransactions);
router.get('/stats', getStats);
router.get('/barchart', getBarChart);
router.get('/piechart', getPieChart);
router.get('/combined', getCombinedData);

module.exports = router;
