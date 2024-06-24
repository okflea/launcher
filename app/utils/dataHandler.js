const fs = require('fs');
const path = require('path');
const dataFile = path.resolve(__dirname, '../data/applications.json');

console.log(`Looking for applications.json at: ${dataFile}`);

exports.getApplicationData = () => {
  try {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${dataFile}:`, err);
    return [];
  }
};

exports.writeApplicationData = (data) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2)); // Pretty-print JSON for readability
  } catch (err) {
    console.error(`Error writing to ${dataFile}:`, err);
  }
};
