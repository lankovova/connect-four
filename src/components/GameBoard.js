import React from 'react';
import styled from 'styled-components';
import { getLastNullishValueIndex } from '../utils';

const P1 = 1;
const P2 = 2;

const COLS = 7;
const ROWS = 6;

// TODO: Make it flexible for case when width is less then height
// const MIN_DIMENSION = Math.min(
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

const CELL_SIZE = document.documentElement.clientHeight * 0.7 / ROWS;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0;
`;

const ColumnsWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: #466cf0;
  border-radius: 10px;
  overflow: hidden;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    cursor: pointer;
    background: lightgrey;
  }
`;

const Cell = styled.div`
  margin: 5px;
  height: ${CELL_SIZE}px;
  width: ${CELL_SIZE}px;
  border-radius: 50%;
  background: ${({ value }) => {
    switch (value) {
      case 0: return 'white';
      case 1: return '#ff3136';
      case 2: return '#FFF001';
      default: throw new Error('Unexpected chip color');
    }
  }};
`;

class GameBoard extends React.Component {
  state = {
    board: Array.from(Array(COLS), () => new Array(ROWS).fill(0)),
    currentPlayer: P1,
  };

  makeTurn(colIndex) {
    this.setState(({ board, currentPlayer }) => {
      const currentCol = board[colIndex];
      const newChipColumnIndex = getLastNullishValueIndex(currentCol);

      if (newChipColumnIndex === -1) {
        return;
      }

      // Place new chip
      currentCol[newChipColumnIndex] = currentPlayer;

      return {
        board,
        currentPlayer: (currentPlayer === P1) ? P2 : P1,
      };
    }, () => {
      // TODO: Check for win conditions
      // if (won) this.props.onGameEnd(p1 || p2);
    });
  }

  render() {
    const { board, currentPlayer } = this.state;
    const currentPlayerTitle = currentPlayer === P1 ? 'First' : 'Second';

    return (
      <Wrapper>
        <StatusBar><b>{currentPlayerTitle}</b>&nbsp;player&#39;s turn</StatusBar>
        <ColumnsWrapper>
          {
            board.map((col, colIndex) => (
              <Column
                key={colIndex}
                onClick={() => this.makeTurn(colIndex)}
              >
                {
                  col.map((cell, cellIndex) => <Cell key={cellIndex} value={cell} />)
                }
              </Column>
            ))
          }
        </ColumnsWrapper>
      </Wrapper>
    );
  }
}

export default GameBoard;
