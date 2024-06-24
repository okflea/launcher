
const { getApplicationData, writeApplicationData } = require('../utils/dataHandler');

exports.getAllApplications = (req, res) => {
  try {
    const applications = getApplicationData();
    res.json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: 'Failed to retrieve applications' });
  }
};

exports.addApplication = (req, res) => {
  const { path, parameters } = req.body;
  if (!path) {
    return res.status(400).send('Missing application path');
  }

  try {
    const applications = getApplicationData();
    applications.push({ path, parameters });
    writeApplicationData(applications);
    res.status(201).send('Application added successfully');
  } catch (err) {
    console.error('Error adding application:', err);
    res.status(500).json({ error: 'Failed to add application' });
  }
};

exports.removeApplication = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send('Invalid application ID');
  }

  try {
    const applications = getApplicationData().filter((app, index) => index !== id);
    writeApplicationData(applications);
    res.status(200).send('Application removed successfully');
  } catch (err) {
    console.error('Error removing application:', err);
    res.status(500).json({ error: 'Failed to remove application' });
  }
};
