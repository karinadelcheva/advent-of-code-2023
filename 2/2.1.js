const fs = require("fs");

function getGameID(line) {
  // sample: Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  return Number(line.split(":")[0].split(" ")[1]);
}
const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

function gameIsPossible(line) {
  const gameParts = line.split(":").pop().split(";");
  console.log(gameParts);
  let poss = true;
  let green = 0;
  gameParts.forEach((part) => {
    green = Number(part.match(/\d+(?= green)/));
    if (green > maxGreen) {
      poss = false;
    }
  });
  let red = 0;
  gameParts.forEach((part) => {
    red = Number(part.match(/\d+(?= red)/));
    if (red > maxRed) {
      poss = false;
    }
  });
  let blue = 0;
  gameParts.forEach((part) => {
    blue = Number(part.match(/\d+(?= blue)/));
    if (blue > maxBlue) {
      poss = false;
    }
  });

  return poss;
}

// Function to read the file and calculate the possible dame IDs' sum
function calculateTotalPossibleGames(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    const lines = data.split("\n").filter((line) => line.length > 0);
    let IDsSum = 0;

    lines.forEach((line) => {
      if (gameIsPossible(line)) {
        IDsSum += getGameID(line);
      }
    });

    return IDsSum;
  } catch (error) {
    console.error("Error reading the file:", error.message);
    return 0;
  }
}

// Replace 'filename.txt' with the actual filename containing the puzzle data
const filename = "input.txt";
const result = calculateTotalPossibleGames(filename);

console.log("Sum of possible game IDs:", result);
