const fs = require('fs');

// Function to calculate the calibration value for a given line
function calculateCalibrationValue(line) {
  const firstDigit = parseInt(line.match(/\d/));
  const lastDigit = parseInt(line.match(/\d(?=\D*$)/));
  
  if (!isNaN(firstDigit) && !isNaN(lastDigit)) {
    return firstDigit * 10 + lastDigit;
  } else {
    return 0;
  }
}

// Function to read the file and calculate the total calibration value
function calculateTotalCalibration(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    const lines = data.split('\n');
    let totalCalibration = 0;

    lines.forEach(line => {
      totalCalibration += calculateCalibrationValue(line);
    });

    return totalCalibration;
  } catch (error) {
    console.error('Error reading the file:', error.message);
    return 0;
  }
}

// Replace 'filename.txt' with the actual filename containing the puzzle data
const filename = 'input.txt';
const result = calculateTotalCalibration(filename);

console.log('Total Calibration Value:', result);
