const { getStatistics } = require('./statisticsController');
const { getBarChart } = require('./chartController');
const { getPieChart } = require('./chartController');

const getCombinedData = async (req, res) => {
    const { month } = req.query;

    try {
      
        const statistics = await getStatistics(req, res, true); 
        const barChart = await getBarChart(req, res, true);
        const pieChart = await getPieChart(req, res, true);

        const combinedData = {
            statistics,
            barChart,
            pieChart,
        };

        res.status(200).json(combinedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCombinedData };
