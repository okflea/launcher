
const express = require('express');
const router = express.Router();
const launchController = require('../controllers/launchController');

router.post('/', launchController.launchApplication);

module.exports = router;
