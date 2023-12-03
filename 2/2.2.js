const fs = require("fs");

function getGameID(line) {
  // sample: Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  return Number(line.split(":")[0].split(" ")[1]);
}

function gamePowers(line) {
  const gameParts = line.split(":").pop().split(";");
  let maxGreen = 0;
  gameParts.forEach((part) => {
    green = Number(part.match(/\d+(?= green)/));
    if (green > maxGreen) {
      maxGreen = green;
    } 
  });
  let maxRed = 0;
  gameParts.forEach((part) => {
    red = Number(part.match(/\d+(?= red)/));
    if (red > maxRed) {
      maxRed = red;
    }
  });
  let maxBlue = 0;
  gameParts.forEach((part) => {
    blue = Number(part.match(/\d+(?= blue)/));
    if (blue > maxBlue) {
      maxBlue = blue;
    }
  });

  return maxGreen * maxBlue * maxRed;
}

// Function to read the file and calculate the possible dame IDs' sum
function calculateTotalPossibleGames(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    const lines = data.split("\n").filter((line) => line.length > 0);
    let powersSum = 0;

    lines.forEach((line) => {
        powersSum += gamePowers(line);
    });

    return powersSum;
  } catch (error) {
    console.error("Error reading the file:", error.message);
    return 0;
  }
}

// Replace 'filename.txt' with the actual filename containing the puzzle data
const filename = "input.txt";
const result = calculateTotalPossibleGames(filename);

console.log("Sum of possible game IDs:", result);
