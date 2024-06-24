
const express = require('express');
const app = express();
const port = 3000; // Change port if needed

// Middleware
app.use(express.json());

// Routes
const applicationsRouter = require('./routes/applications');
const launchRouter = require('./routes/launch');
app.use('/applications', applicationsRouter);
app.use('/launch', launchRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
