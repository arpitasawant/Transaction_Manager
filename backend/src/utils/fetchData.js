const axios = require('axios');

const fetchData = async () => {
    const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
    const response = await axios.get(url);
    return response.data;
};

module.exports = fetchData;
