export const getValueByNumericalDigit = (value, numericalDigit) => {
  const digits = String(Math.floor(value / numericalDigit)).split("");
  
  return digits[digits.length - 1];
};

export const generateMap = (rows, cols, mines, currentCoords) => {
  const { currentRow, currentCell } = currentCoords;
  const map = [];

  for (let i = 0; i < rows; i++) {
    map[i] = [];

    for (let j = 0; j < cols; j++) {
      map[i][j] = 0;
    }
  }

  let placedMines = 0;

  while (placedMines < mines) {
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * cols);

    if (map[row][col] === 0 && !(row === currentRow && col === currentCell)) {
      map[row][col] = "#";
      placedMines++;
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (map[i][j] !== "#") {
        let count = 0;

        if (i > 0 && j > 0 && map[i - 1][j - 1] === "#") count++;
        if (i > 0 && map[i - 1][j] === "#") count++;
        if (i > 0 && j < cols - 1 && map[i - 1][j + 1] === "#") count++;
        if (j > 0 && map[i][j - 1] === "#") count++;
        if (j < cols - 1 && map[i][j + 1] === "#") count++;
        if (i < rows - 1 && j > 0 && map[i + 1][j - 1] === "#") count++;
        if (i < rows - 1 && map[i + 1][j] === "#") count++;
        if (i < rows - 1 && j < cols - 1 && map[i + 1][j + 1] === "#") count++;

        map[i][j] = count;
      }
    }
  }

  return map;
};

export const getAutoOpenArea = (map, row, col) => {
  const zeros = new Set();
  const borders = new Set();
  const visited = new Set();
  const queue = [[row, col]];
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

  while (queue.length > 0) {
    const [queueRow, queueCol] = queue.shift();

    visited.add(`${queueRow},${queueCol}`);

    if (map[queueRow][queueCol] === 0) {
      zeros.add(`${queueRow},${queueCol}`);

      for (const [directionRow, directionCol] of directions) {
        const newRow = queueRow + directionRow;
        const newCol = queueCol + directionCol;

        if (newRow >= 0 && newRow < map.length && newCol >= 0 && newCol < map[0].length) {
          const key = `${newRow},${newCol}`;

          if (!visited.has(key)) {
            queue.push([newRow, newCol]);
          }
        }
      }
    } else {
      borders.add(`${queueRow},${queueCol}`);
    }
  }

  return [
    ...Array.from(zeros).map((coord) => coord.split(",").map((n) => parseInt(n))),
    ...Array.from(borders).map((coord) => coord.split(",").map((n) => parseInt(n)))
  ];
};
