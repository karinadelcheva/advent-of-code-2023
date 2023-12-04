const fs = require("fs");

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
  let scoreNumbers = elfsNumbers.filter((number) =>
    winningNumbers.includes(number)
  );

  if (scoreNumbers.length > 0) {
    return scoreNumbers
      .slice(1)
      .reduce((points, _, index) => points + Math.pow(2, index), 1);
  } else return 0;
}


function calculateResult(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    const lines = data.split("\n").filter((line) => line.length > 0);
    let pointsSum = 0;
    lines.forEach((line) => {
        pointsSum += calcGamePoints(line);
    });

    return pointsSum;
  } catch (error) {
    console.error("Error reading the file:", error.message);
    return 0;
  }
}

const filename = "input.txt";
const result = calculateResult(filename);

console.log("Sum of scoring numbers:", result);
