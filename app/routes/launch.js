
const express = require('express');
const router = express.Router();
const launchController = require('../controllers/launchController');

router.post('/', launchController.launchApplication);
router.post('/quit', launchController.quitApplication);

module.exports = router;
