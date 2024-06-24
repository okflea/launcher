
const express = require('express');
const app = express();
const port = 3000; // Change port if needed

// Middleware
app.use(express.json());
// CORS configuration
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow these HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allow these headers
  next();
});

// Routes
const applicationsRouter = require('./routes/applications');
const launchRouter = require('./routes/launch');
app.use('/applications', applicationsRouter);
app.use('/launch', launchRouter);
app.use('/systemInfo', require('./routes/systemInfo'));
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
