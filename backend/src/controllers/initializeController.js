const fetchData = require('../utils/fetchData');
const Transaction = require('../models/Transaction');

const initializeDatabase = async (req, res) => {
    try {
        const data = await fetchData();
        await Transaction.deleteMany(); 
        await Transaction.insertMany(data); 
        res.status(200).json({ message: 'Database initialized successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { initializeDatabase };
