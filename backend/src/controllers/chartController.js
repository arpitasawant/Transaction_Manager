const Transaction = require('../models/Transaction');

const getBarChart = async (req, res) => {
    const { month } = req.query;

    const monthNum = parseInt(month, 10);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        return res.status(400).json({ error: 'Invalid month parameter. It must be between 1 and 12.' });
    }

    try {
       
        const transactions = await Transaction.aggregate([
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
                $project: {
                    price: 1, 
                },
            },
        ]);

        // console.log('Fetched Transactions:', transactions);

       
        if (!transactions.length) {
            return res.status(200).json({
                '0-100': 0,
                '101-200': 0,
                '201-300': 0,
                '301-400': 0,
                '401-500': 0,
                '501-600': 0,
                '601-700': 0,
                '701-800': 0,
                '801-900': 0,
                '901+': 0,
            });
        }

        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901+': 0,
        };

        transactions.forEach(({ price }) => {
            // console.log(`Categorizing price: ${price}`);

            const parsedPrice = Number(price);

            if (!isNaN(parsedPrice)) {
                if (parsedPrice >= 0 && parsedPrice <= 100) priceRanges['0-100']++;
                else if (parsedPrice > 100 && parsedPrice <= 200) priceRanges['101-200']++;
                else if (parsedPrice > 200 && parsedPrice <= 300) priceRanges['201-300']++;
                else if (parsedPrice > 300 && parsedPrice <= 400) priceRanges['301-400']++;
                else if (parsedPrice > 400 && parsedPrice <= 500) priceRanges['401-500']++;
                else if (parsedPrice > 500 && parsedPrice <= 600) priceRanges['501-600']++;
                else if (parsedPrice > 600 && parsedPrice <= 700) priceRanges['601-700']++;
                else if (parsedPrice > 700 && parsedPrice <= 800) priceRanges['701-800']++;
                else if (parsedPrice > 800 && parsedPrice <= 900) priceRanges['801-900']++;
                else priceRanges['901+']++;
            } else {
                console.error(`Invalid price encountered: ${price}`);
            }
        });

        res.status(200).json(priceRanges);
    } catch (error) {
        
        res.status(500).json({ error: 'An error occurred while fetching bar chart data.' });
    }
};



const getPieChart = async (req, res) => {
    const { month } = req.query;
    const startOfMonth = new Date(`2024-${month}-01`);
    const endOfMonth = new Date(`2024-${parseInt(month) + 1}-01`);

    try {
        const transactions = await Transaction.find({
            dateOfSale: { $gte: startOfMonth, $lt: endOfMonth },
        });

        const categoryCounts = transactions.reduce((acc, { category }) => {
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});

        const formattedData = Object.entries(categoryCounts).map(([category, count]) => ({
            category,
            count,
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { getBarChart,getPieChart };
