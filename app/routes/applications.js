
const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');

router.get('/', applicationsController.getAllApplications);
router.post('/', applicationsController.addApplication);
router.delete('/:id', applicationsController.removeApplication);

module.exports = router;
