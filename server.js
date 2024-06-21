const { log } = require('console');
const express = require('express');
const fs = require('fs'); // For file operations

const app = express();
app.use(express.json())
const port = 3000; // Change port if needed

// Application data file (replace with your desired path)
const dataFile = './applications.json';

// Helper function to read application data
const getApplicationData = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Helper function to write application data
const writeApplicationData = (data) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2)); // Pretty-print JSON for readability
  } catch (err) {
    console.error(err);
  }
};

// Get all applications
app.get('/applications', (req, res) => {
  try {
    const applications = getApplicationData();
    res.json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: 'Failed to retrieve applications' });
  }
});

// Add a new application (implement security and validation in Part 3)
app.post('/applications', (req, res) => {
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
});

// Remove an application (implement security and confirmation in Part 3)
app.delete('/applications/:id', (req, res) => {
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
});

//testing launch with hardcoded values;
const { exec } = require('child_process');


// app.get('/launch', (req, res) => {
//   const url = ''; // Replace with dynamic URL if needed
//
//   const command = `start "" "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" ${url}`;
//
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error launching application: ${error.message}`);
//       res.status(500).send('Error launching application');
//       return; // Exit the callback function on error
//     }
//
//     console.log('Application launched successfully');
//     res.status(200).send('Application launched successfully');
//   });
// });

// Launch an application (implement security and validation in Part 3)
app.post('/launch', (req, res) => {

  const { path, parameters } = req.body;
  if (!path) {
    return res.status(400).send('Missing application path');
  }

  const command = `start "" "${path}" ${parameters}`;
  log(`Command: ${command}`);
  // Use child_process to launch the application
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error launching application: ${error.message}`);
      res.status(500).send('Error launching application');
      return; // Exit the callback function on error
    }

    console.log('Application launched successfully');
    res.status(200).send('Application launched successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
