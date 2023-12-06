const fs = require("fs");

function calculateResult(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    let lines = data.split("\n").filter((line) => line.length > 0);
    lines = lines.map(line => line.split(":")[1].trim().split(' ')).map(line => line.filter(num => num.length > 0).map(num => Number(num)))
    let [times, distances] = lines
    let margin = 1

    var zip = times.map(function(e, i) {
        return [e, distances[i]];
    });
    zip.forEach(([time, distance]) => {
        n = 0
        for (let hold = 1; hold < time; hold++) {
            if (hold * (time - hold) > distance) {
                n += 1
            }
        }
        margin*=n
    })
    return margin;
  } catch (error) {
    console.error("Error reading the file:", error.message);
    return 0;
  }
}

const filename = "input.txt";
const result = calculateResult(filename);

console.log("Sum of races:", result);
