import * as utils from './utils';
import {
  EMPTY_CELL,
  P1,
  P2,
} from './constansts';

describe('isCellEmpty', () => {
  it('should return true if passed cell if empty', () => {
    expect(utils.isCellEmpty(EMPTY_CELL)).toBeTruthy();
  });

  it('should return false if passed cell is not empty', () => {
    expect(utils.isCellEmpty(P1)).toBeFalsy();
    expect(utils.isCellEmpty(P2)).toBeFalsy();
  });
});

describe('getNextTurnChipIndexInCol', () => {
  it('should return cell index of next turn in passed col', () => {
    expect(
      utils.getNextTurnChipIndexInCol([0, 0, 0, 0, 2, 1])
    ).toBe(3);

    expect(
      utils.getNextTurnChipIndexInCol([0, 0, 0, 0, 0, 0])
    ).toBe(5);
  });

  it('should return -1 if there is no available chip slot', () => {
    expect(
      utils.getNextTurnChipIndexInCol([1, 2, 1, 1, 2, 1])
    ).toBe(-1);
  });
});

describe('isBoardHasEmptyCells', () => {
  it('should return true if board has empty cells', () => {
    const boardWithEmptyCells = [
      [0, 0, 1, 2, 1, 2],
      [0, 0, 1, 2, 1, 2],
      [0, 0, 1, 2, 1, 2],
      [0, 0, 1, 2, 1, 2],
      [0, 0, 1, 2, 1, 2],
    ];

    expect(utils.isBoardHasEmptyCells(boardWithEmptyCells)).toBeTruthy();
  });

  it('should return false if board dosen\'t has empty cells', () => {
    const boardWithoutEmptyCells = [
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
    ];

    expect(utils.isBoardHasEmptyCells(boardWithoutEmptyCells)).toBeFalsy();
  });
});

describe('isThereFourInARow', () => {
  it('should return true if row has four same chips in a row', () => {
    expect(utils.isThereFourInARow([0, 1, 1, 1, 1, 0])).toBeTruthy();
  });

  it('should return false if row hasn\'t four same chips in a row', () => {
    expect(utils.isThereFourInARow([0, 1, 1, 0, 1, 1])).toBeFalsy();
    expect(utils.isThereFourInARow([0, 1, 1, 2, 1, 0])).toBeFalsy();
    expect(utils.isThereFourInARow([0, 0, 0, 0, 0, 0])).toBeFalsy();
  });
});

describe.skip('isThereWinCondition', () => {
  it('should return true if there is a win condition in a row', () => {});

  it('should return true if there is a win condition in a col', () => {});

  it('should return true if there is a win condition in a diagonals', () => {});
});
