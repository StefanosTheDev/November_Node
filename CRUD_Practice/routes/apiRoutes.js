const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');

router.route('/productNames').get(apiController.listProductNames);
router.route('/loyaltypoints').get(apiController.totalLoyaltyPoints);
module.exports = router;
