const axios = require('axios');
const { apiKeys } = require('../constant');

const apiKey = apiKeys[0];

const getTokenByIds = async (ids) => {
  try {
    res = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&ids=${ids}&interval=1h,1d,7d,30d&convert=EUR&per-page=100&page=1`);
    
    return res.data;
  } catch(error) {    
    return res.status(500).send('Server Error - nomicsHelper - getTokenByIds');
  }
}

module.exports = {
  getTokenByIds
}