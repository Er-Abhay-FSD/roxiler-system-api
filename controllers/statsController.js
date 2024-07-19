const Transaction = require('../models/Transaction');

const getStats = async (req, res) => {
  try {
    const { startYear, startMonth, endYear, endMonth } = req.query;

    // Check for required parameters
    if (!startYear || !startMonth || !endYear || !endMonth) {
      return res.status(400).json({ message: 'Start year, start month, end year, and end month parameters are required' });
    }

    // Ensure month is always two digits
    const formattedStartMonth = startMonth.padStart(2, '0');
    const formattedEndMonth = endMonth.padStart(2, '0');

    // Validate month and year format
    if (!/^(0[1-9]|1[0-2])$/.test(formattedStartMonth) || !/^\d{4}$/.test(startYear) ||
        !/^(0[1-9]|1[0-2])$/.test(formattedEndMonth) || !/^\d{4}$/.test(endYear)) {
      return res.status(400).json({ message: 'Invalid month or year format. Use MM format and YYYY format.' });
    }

    // Define the start and end of the period
    const startOfMonth = new Date(`${startYear}-${formattedStartMonth}-01T00:00:00Z`);
    const endOfMonth = new Date(`${endYear}-${formattedEndMonth}-01T00:00:00Z`);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setHours(23, 59, 59, 999);

    // Check if date objects are valid
    if (isNaN(startOfMonth.getTime()) || isNaN(endOfMonth.getTime())) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    // Calculate total sales and total sold items
    const totalSales = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startOfMonth, $lt: endOfMonth } } },
      { $group: { _id: null, totalAmount: { $sum: '$price' }, totalSoldItems: { $sum: 1 } } }
    ]);

    // Calculate total not sold items (before the start date and after the end date)
    const totalNotSoldItemsBefore = await Transaction.countDocuments({
      dateOfSale: { $lt: startOfMonth }
    });

    const totalNotSoldItemsAfter = await Transaction.countDocuments({
      dateOfSale: { $gt: endOfMonth }
    });

    const totalNotSoldItems = totalNotSoldItemsBefore + totalNotSoldItemsAfter;

    // Response with statistics
    res.status(200).json({
      totalSales: totalSales[0]?.totalAmount || 0,
      totalSoldItems: totalSales[0]?.totalSoldItems || 0,
      totalNotSoldItems
    });
  } catch (error) {
    console.error('Error retrieving statistics:', error.message);
    res.status(500).json({ message: 'Error retrieving statistics' });
  }
};

module.exports = { getStats };
