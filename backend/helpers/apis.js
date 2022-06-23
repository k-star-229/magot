const axios = require('axios');

const getMarketChartData = async (req, res) => {

    const { period } = req.body;

    try {
        const to = Math.floor(new Date() / 1000);
        const from = to - 3600 * period;

        let tradingChart = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${from}&to=${to}`);

        let data = tradingChart.data;

        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const getTradingHistory = async (req, res) => {

    // const { net, tokenAddress } = req.body;

    try {

        // let tradingHistory = await axios.get(`https://io.dexscreener.com/u/trading-history/recent/${net}/${tokenAddress}`);

        let tradingHistory = await axios.get(`https://io.dexscreener.com/u/chart/bars/bsc/0x5C38Ed8835D1157BAf78C03124d4afE41E2B515C?from=1655619965000&to=1655889905135&res=15&cb=300`);

        res.status(200).json(tradingHistory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports = {
    getMarketChartData,
    getTradingHistory
}