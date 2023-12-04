
function formatCards (data) {
  return data
  .split("\n")
  .filter((line) => !!line)
  .map((line) => line.split(":")[1])
  .map((line, i) => {
    const [wnStr, anStr] = line.split("|");
    const wn = wnStr
      .trim()
      .split(/\s+/) // saw this on reddit, thought it was cool
      .map((w) => +w.trim());
    const an = anStr
      .trim()
      .split(/\s+/)
      .map((w) => +w.trim());
    const count = an.filter((a) => wn.some((w) => a === w)).length;
    return {
      cn: i,
      winAmount: count,
    };
  });
}

function getWonCards (cards) {
  const wonCards = [];
  cards.forEach((card, i) => {
    wonCards.push(card);
    const iCardsCopies = wonCards.filter((c) => c.cn === i).length;
    for (let u = 0; u < iCardsCopies; u++) {
      for (let j = 0; j < card.winAmount; j++) {
        const tmp = cards.find((c) => c.cn === i + j + 1);
        if (tmp) {
          wonCards.push(tmp);
        } else {
          cards.push({
            cn: i + j + 1,
            winAmount: 0,
          });
        }
      }
    }
  });
  return wonCards;
}


// Function to read the file and calculate the possible dame IDs' sum
function calculateResult() {
  try {
    const fs = require("fs");
    const filename = "input.txt";
    const data = fs.readFileSync(filename, "utf8");

    const cards = formatCards(data);
    const wonCards = getWonCards(cards);
    return wonCards.length.toString();
  } catch (error) {
    console.error("Error reading the file:", error.message);
    return 0;
  }
}

console.log('Result with bonuscards = ', calculateResult()); //19499881 on my input
