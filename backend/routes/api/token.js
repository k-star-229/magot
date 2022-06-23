const express = require('express');
const router = express.Router();
const apis = require('../../helpers/apis');
// @route    GET api/token
// @desc     Get market chat data
// @access   Public

router.get('/', apis.getTradingHistory);

module.exports = router;