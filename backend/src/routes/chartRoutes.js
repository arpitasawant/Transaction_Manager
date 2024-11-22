const express = require('express');
const { getBarChart, getPieChart } = require('../controllers/chartController');

const router = express.Router();

router.get('/bar-chart', getBarChart);

router.get('/pie-chart', getPieChart);

module.exports = router;
