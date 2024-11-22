const Transaction = require('../models/Transaction');

const listTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;
    const regex = new RegExp(search, 'i');
    const monthMap = {
        January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
        July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
    };
    const monthNumber = monthMap[month];

    if (!monthNumber) {
        return res.status(400).json({ error: "Invalid month provided" });
    }

    const searchConditions = [
        { title: regex },
        { description: regex },
    ];

    if (!isNaN(search)) {
        searchConditions.push({ price: parseFloat(search) });
    }

    const query = {
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
        ...(search && { $or: searchConditions }),
    };

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));
        const total = await Transaction.countDocuments(query);

        res.status(200).json({ transactions, total });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { listTransactions };
