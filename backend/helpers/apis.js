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

        // const url = "https://io.dexscreener.com/u/trading-history/recent/bsc/0x5C38Ed8835D1157BAf78C03124d4afE41E2B515C";
        // var headers = {
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTION",
        //     "Content-Type": "application/json",
        // };

        // const tradingHistory = await fetch(url, {
        //     method: "GET",
        //     mode: "cors",
        //     headers: headers,
        // });
        // let tradingHistory = await axios.get(`https://io.dexscreener.com/u/trading-history/recent/${net}/${tokenAddress}`);

        let tradingHistory = await axios.get(`https://io.dexscreener.com/u/trading-history/recent/bsc/0x5C38Ed8835D1157BAf78C03124d4afE41E2B515C`);

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