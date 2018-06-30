import { EMPTY_CELL } from './constansts';

export const isCellEmpty = cell => cell === EMPTY_CELL;

export const isCellNotEmpty = cell => !isCellEmpty(cell);

export const isBoardHasEmptyCells = board => board.some(col => col.some(isCellEmpty));

export const getNextTurnChipIndexInCol = (col) => {
  const index = col.findIndex(isCellNotEmpty);

  if (index === -1) return col.length - 1;
  return index - 1;
};

export const isThereFourInARow = (row) => {
  let counter = 0;
  let cellValueInARow;

  for (const cell of row) {
    if (isCellEmpty(cell)) {
      counter = 0;
      continue;
    }

    if (cellValueInARow === cell) {
      counter += 1;
    } else {
      cellValueInARow = cell;
      counter = 1;
    }

    if (counter === 4) {
      return true;
    }
  }

  return false;
};

export const isThereWinCondition = (board, { colId, rowId }) => {
  // Check in col
  if (isThereFourInARow(board[colId])) {
    return true;
  }

  // Check in rows
  const rowFromCols = board.map(col => col[rowId]);
  if (isThereFourInARow(rowFromCols)) {
    return true;
  }

  // TODO: Check diagonals rows
};
