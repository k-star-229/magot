const express = require('express');
const router = express.Router();
const apis = require('../../helpers/apis');
// @route    GET api/markets
// @desc     Get market chat data
// @access   Public

router.get('/', apis.getMarketChartData);

module.exports = router;