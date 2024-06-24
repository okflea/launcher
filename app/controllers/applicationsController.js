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
  const { name, path, parameter, icon } = req.body;
  if (!name || !path) {
    return res.status(400).send('Missing application name or path');
  }

  try {
    const applications = getApplicationData();
    applications.push({ name, path, parameter, icon });
    writeApplicationData(applications);
    res.status(201).send('Application added successfully');
  } catch (err) {
    console.error('Error adding application:', err);
    res.status(500).json({ error: 'Failed to add application' });
  }
};

exports.updateApplication = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, path, parameter, icon } = req.body;

  if (isNaN(id)) {
    return res.status(400).send('Invalid application ID');
  }

  try {
    const applications = getApplicationData();
    if (id < 0 || id >= applications.length) {
      return res.status(404).send('Application not found');
    }
    applications[id] = { name, path, parameter, icon };
    writeApplicationData(applications);
    res.status(200).send('Application updated successfully');
  } catch (err) {
    console.error('Error updating application:', err);
    res.status(500).json({ error: 'Failed to update application' });
  }
};

exports.removeApplication = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send('Invalid application ID');
  }

  try {
    const applications = getApplicationData().filter((_, index) => index !== id);
    writeApplicationData(applications);
    res.status(200).send('Application removed successfully');
  } catch (err) {
    console.error('Error removing application:', err);
    res.status(500).json({ error: 'Failed to remove application' });
  }
};
