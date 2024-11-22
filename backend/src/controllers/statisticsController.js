const Transaction = require('../models/Transaction');

const getStatistics = async (req, res) => {
    const { month } = req.query;

    const monthNum = parseInt(month, 10);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        return res.status(400).json({ error: 'Invalid month parameter. It must be between 1 and 12.' });
    }

    try {
        
        const result = await Transaction.aggregate([
            {
                $addFields: {
                    saleMonth: { $month: "$dateOfSale" }, 
                },
            },
            {
                $match: {
                    saleMonth: monthNum, 
                },
            },
            {
                $group: {
                    _id: null, 
                    totalSaleAmount: {
                        $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] },
                    }, 
                    soldItems: {
                        $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] },
                    }, 
                    notSoldItems: {
                        $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] },
                    }, 
                },
            },
        ]);

        
        const resultData = result.length > 0 ? result[0] : { totalSaleAmount: 0, soldItems: 0, notSoldItems: 0 };

        res.status(200).json(resultData);
    } catch (error) {
        console.error('Error during aggregation:', error);
        res.status(500).json({ error: 'An error occurred while fetching statistics.' });
    }
};

module.exports = { getStatistics };
