const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');

router.get('/', applicationsController.getAllApplications);
router.post('/', applicationsController.addApplication);
router.put('/:id', applicationsController.updateApplication);
router.delete('/:id', applicationsController.removeApplication);

module.exports = router;
