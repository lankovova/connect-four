export const getLastNullishValueIndex = (arr) => {
  const index = arr.findIndex(el => el !== 0);

  if (index === -1) return arr.length - 1;
  return index - 1;
};

export const isThereFiveInARow = (row) => {
  const lastInARow = row.reduce((inARow, currentChip) => {
    if (
      inARow.count === 5
      || currentChip === 0
    ) {
      return inARow;
    }

    if (inARow.chip === currentChip) {
      return {
        chip: currentChip,
        count: inARow.count + 1,
      };
    }

    return {
      chip: currentChip,
      count: 1,
    };
  }, {});

  return lastInARow.count === 5;
};

export const isThereWinCondition = (board, { colId, rowId }) => {
  // Check in row
  if (isThereFiveInARow(board[colId])) {
    return true;
  }

  // Check in cols
  const rowFromCols = board.map(col => col[rowId]);
  if (isThereFiveInARow(rowFromCols)) {
    return true;
  }

  // TODO: Check diagonals rows
};
