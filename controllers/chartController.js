// controllers/chartController.js
const Transaction = require('../models/Transaction'); // Use CommonJS require

// Function to get bar chart data
const getBarChart = async (req, res) => {
  const { startYear, startMonth, endYear, endMonth } = req.query;

  if (!startYear || !startMonth || !endYear || !endMonth) {
    return res.status(400).json({ message: 'All date parameters (startYear, startMonth, endYear, endMonth) are required' });
  }

  // Ensure month is always two digits
  const formattedStartMonth = startMonth.padStart(2, '0');
  const formattedEndMonth = endMonth.padStart(2, '0');
  
  if (!/^\d{4}$/.test(startYear) || !/^\d{4}$/.test(endYear) || !/^(0[1-9]|1[0-2])$/.test(formattedStartMonth) || !/^(0[1-9]|1[0-2])$/.test(formattedEndMonth)) {
    return res.status(400).json({ message: 'Invalid date format. Use YYYY and MM format.' });
  }

  // Define the start and end of the range
  const startOfRange = new Date(`${startYear}-${formattedStartMonth}-01T00:00:00Z`);
  const endOfRange = new Date(`${endYear}-${formattedEndMonth}-01T00:00:00Z`);
  endOfRange.setMonth(endOfRange.getMonth() + 1);
  endOfRange.setHours(23, 59, 59, 999);

  // Check if date objects are valid
  if (isNaN(startOfRange.getTime()) || isNaN(endOfRange.getTime())) {
    return res.status(400).json({ message: 'Invalid date range' });
  }

  try {
    const barChartData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startOfRange, $lt: endOfRange }
        }
      },
      {
        $bucket: {
          groupBy: {
            $cond: [
              { $lt: ["$price", 101] }, 0,
              { $cond: [
                  { $lt: ["$price", 201] }, 101,
                  { $cond: [
                      { $lt: ["$price", 301] }, 201,
                      { $cond: [
                          { $lt: ["$price", 401] }, 301,
                          { $cond: [
                              { $lt: ["$price", 501] }, 401,
                              { $cond: [
                                  { $lt: ["$price", 601] }, 501,
                                  { $cond: [
                                      { $lt: ["$price", 701] }, 601,
                                      { $cond: [
                                          { $lt: ["$price", 801] }, 701,
                                          { $cond: [
                                              { $lt: ["$price", 901] }, 801,
                                              901
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901, Infinity],
          default: 'Other',
          output: {
            count: { $sum: 1 }
          }
        }
      },
      {
        $project: {
          _id: 0,
          priceRange: "$_id",
          count: 1
        }
      }
    ]);

    res.status(200).json(barChartData);
  } catch (error) {
    console.error('Error retrieving bar chart data:', error.message);
    res.status(500).json({ message: 'Error retrieving bar chart data' });
  }
};

// Function to get pie chart data
const getPieChart = async (req, res) => {
  const { startYear, startMonth, endYear, endMonth } = req.query;

  if (!startYear || !startMonth || !endYear || !endMonth) {
    return res.status(400).json({ message: 'All date parameters (startYear, startMonth, endYear, endMonth) are required' });
  }

  // Ensure month is always two digits
  const formattedStartMonth = startMonth.padStart(2, '0');
  const formattedEndMonth = endMonth.padStart(2, '0');
  
  if (!/^\d{4}$/.test(startYear) || !/^\d{4}$/.test(endYear) || !/^(0[1-9]|1[0-2])$/.test(formattedStartMonth) || !/^(0[1-9]|1[0-2])$/.test(formattedEndMonth)) {
    return res.status(400).json({ message: 'Invalid date format. Use YYYY and MM format.' });
  }

  // Define the start and end of the range
  const startOfRange = new Date(`${startYear}-${formattedStartMonth}-01T00:00:00Z`);
  const endOfRange = new Date(`${endYear}-${formattedEndMonth}-01T00:00:00Z`);
  endOfRange.setMonth(endOfRange.getMonth() + 1);
  endOfRange.setHours(23, 59, 59, 999);

  // Check if date objects are valid
  if (isNaN(startOfRange.getTime()) || isNaN(endOfRange.getTime())) {
    return res.status(400).json({ message: 'Invalid date range' });
  }

  try {
    const pieChartData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startOfRange, $lt: endOfRange }
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1
        }
      }
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error('Error retrieving pie chart data:', error.message);
    res.status(500).json({ message: 'Error retrieving pie chart data' });
  }
};

module.exports = { getBarChart, getPieChart };
