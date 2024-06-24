
const { exec } = require('child_process');

exports.launchApplication = (req, res) => {
  const { path, parameters } = req.body;
  if (!path) {
    return res.status(400).send('Missing application path');
  }

  const command = `start "" "${path}" ${parameters}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error launching application: ${error.message}`);
      res.status(500).send('Error launching application');
      return;
    }

    console.log('Application launched successfully');
    res.status(200).send('Application launched successfully');
  });
};
exports.quitApplication = (req, res) => {
  const { application } = req.body;
  if (!application) {
    return res.status(400).send('Application path is required');
  }
  const command = `taskkill /IM ${application.split('\\').pop()} /F`;
  exec(command, (err) => {
    if (err) {
      return res.status(500).send(`Failed to quit application: ${err.message}`);
    }
    res.send('Application quit successfully');
  });
};
