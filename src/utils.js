export const getLastNullishValueIndex = (arr) => {
  const index = arr.findIndex(el => el !== 0);

  if (index === -1) return arr.length - 1;
  return index - 1;
};

// TODO: Implement
export const isThereWinCondition = (board) => {};
