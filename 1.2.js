const fs = require('fs');

// Define a dictionary to map spelled-out numbers to their numeric counterparts
const spelledOutMapping = {
  'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
  'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
};

// Function to calculate the calibration value for a given line
function calculateCalibrationValue(line) {
  // Use a regular expression to match spelled-out numbers and replace them with their numeric counterparts
  const numericString = line.replaceAll(/(?:zero|one|two|three|four|five|six|seven|eight|nine)/gi, match => spelledOutMapping[match.toLowerCase()] || match);
  const firstDigit = parseInt(numericString.match(/\d/));
  const lastDigit = parseInt(numericString.match(/\d(?=\D*$)/));
  
  console.log(line, numericString, firstDigit, lastDigit)
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

const filename = 'input.txt';
const result = calculateTotalCalibration(filename);

console.log('Total Calibration Value:', result);
