const fs = require("fs");

function getGameID(line) {
  // sample: Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  const number = Number(line.split(":")[0].split(" ")[1]);
}

function calcGamePoints(line) {
  line = line.split(":").pop();
  const winningNumbers = line
    .split("|")[0]
    .split(" ")
    .filter((number) => number.length > 0)
    .map((number) => Number(number));
  const elfsNumbers = line
    .split("|")[1]
    .split(" ")
    .filter((number) => number.length > 0)
    .map((number) => Number(number));
  console.log("winningNumbers", winningNumbers, "elfsNumbers", elfsNumbers);
  let scoreNumbers = elfsNumbers.filter((number) =>
    winningNumbers.includes(number)
  );
  console.log(
    "scoreNumbers",
    scoreNumbers,
    "scoreNumbers.length",
    scoreNumbers.length
  );
  if (scoreNumbers.length > 0) {
    return scoreNumbers
      .slice(1)
      .reduce((points, _, index) => points + Math.pow(2, index), 1);
  } else return 0;
}

// Function to read the file and calculate the possible dame IDs' sum
function calculateResult(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    const lines = data.split("\n").filter((line) => line.length > 0);
    let pointsSum = 0;
    let gameCopies = 0;
    lines.forEach((line) => {
      if (calcGamePoints(line) > 0) {
        winningGames.push(getGameID(line));
        pointsSum += calcGamePoints(line);
      }
    });

    return pointsSum;
  } catch (error) {
    console.error("Error reading the file:", error.message);
    return 0;
  }
}

// Replace 'filename.txt' with the actual filename containing the puzzle data
const filename = "input.txt";
const result = calculateResult(filename);

console.log("Sum of scoring numbers:", result);
