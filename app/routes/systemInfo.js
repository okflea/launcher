
const express = require('express');
const router = express.Router();
const os = require('os');

router.get('/', (req, res) => {
  try {
    const systemInfo = {
      architecture: os.arch(),
      platform: os.platform(),
      cpus: os.cpus(),
      freeMemory: os.freemem(),
      totalMemory: os.totalmem(),
      uptime: os.uptime(),
      hostname: os.hostname(),
      networkInterfaces: os.networkInterfaces(),
      currentDateTime: new Date().toLocaleString(),
    };
    res.json(systemInfo);
  } catch (err) {
    console.error('Error fetching system information:', err);
    res.status(500).json({ error: 'Failed to retrieve system information' });
  }
});

module.exports = router;
