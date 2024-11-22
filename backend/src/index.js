const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/initialize', require('./routes/initializeRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/statistics', require('./routes/statisticsRoutes'));
app.use('/api/chart', require('./routes/chartRoutes'));
app.use('/api/combined', require('./routes/combinedRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));