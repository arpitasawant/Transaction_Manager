const express = require('express');
const { initializeDatabase } = require('../controllers/initializeController');

const router = express.Router();

router.get('/', initializeDatabase);

module.exports = router;
