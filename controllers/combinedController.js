const axios = require('axios');

const getCombinedData = async (req, res) => {
  try {
    const { startYear, startMonth, endYear, endMonth } = req.query;

    if (!startYear || !startMonth || !endYear || !endMonth) {
      return res.status(400).json({ message: 'Start year, start month, end year, and end month parameters are required' });
    }

    // Ensure months are always two digits
    const formattedStartMonth = startMonth.padStart(2, '0');
    const formattedEndMonth = endMonth.padStart(2, '0');

    // Validate month format
    const monthPattern = /^(0[1-9]|1[0-2])$/;
    if (!monthPattern.test(formattedStartMonth) || !monthPattern.test(formattedEndMonth)) {
      return res.status(400).json({ message: 'Invalid month format. Use MM format.' });
    }

    // Fetch data from individual endpoints
    const transactions = await getTransactionsData(startYear, formattedStartMonth, endYear, formattedEndMonth);
    const stats = await getStatsData(startYear, formattedStartMonth, endYear, formattedEndMonth);
    const barChart = await getBarChartData(startYear, formattedStartMonth, endYear, formattedEndMonth);
    const pieChart = await getPieChartData(startYear, formattedStartMonth, endYear, formattedEndMonth);

    // Combine the data
    const combinedData = {
      transactions,
      stats,
      barChart,
      pieChart
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error fetching combined data:', error.message);
    res.status(500).json({ message: 'Error retrieving combined data' });
  }
};

// Helper functions to fetch data from other controllers
const getTransactionsData = async (startYear, startMonth, endYear, endMonth) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/transactions`, {
      params: { startYear, startMonth, endYear, endMonth }
    });
    return data;
  } catch (error) {
    console.error('Error fetching transactions data:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch transactions data');
  }
};

const getStatsData = async (startYear, startMonth, endYear, endMonth) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/stats`, {
      params: { startYear, startMonth, endYear, endMonth }
    });
    return data;
  } catch (error) {
    console.error('Error fetching stats data:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch stats data');
  }
};

const getBarChartData = async (startYear, startMonth, endYear, endMonth) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/barchart`, {
      params: { startYear, startMonth, endYear, endMonth }
    });
    return data;
  } catch (error) {
    console.error('Error fetching bar chart data:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch bar chart data');
  }
};

const getPieChartData = async (startYear, startMonth, endYear, endMonth) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/piechart`, {
      params: { startYear, startMonth, endYear, endMonth }
    });
    return data;
  } catch (error) {
    console.error('Error fetching pie chart data:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch pie chart data');
  }
};

module.exports = { getCombinedData };
