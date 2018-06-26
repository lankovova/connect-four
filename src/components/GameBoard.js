import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import {
  getLastNullishValueIndex,
  isThereWinCondition,
} from '../utils';
import {
  ROWS, COLS, P1, P2,
} from '../constansts';

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

const Container = styled.div``;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0; /* TODO: Use em and rem intead of px */
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
    cursor: ${({ isPlayable }) => isPlayable && 'pointer'};
    background: ${({ isPlayable }) => isPlayable && 'lightgrey'};
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

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.2; }
  100% { opacity: 1; }
`;

const ResetBtn = styled.div`
  background: white;
  border: 1px solid #b328fd;
  border-radius: 10px;
  color: black;
  cursor: pointer;
  padding: 0 15px;
  transition: all 200ms linear;

  animation: ${({ isPlayable }) => !isPlayable && blink} 1000ms ease-in-out infinite;

  &:hover {
    background: #b328fd;
    color: white;
    animation: auto;
  }
`;

class GameBoard extends React.Component {
  state = this.getInitialBoardState();

  getInitialBoardState() {
    return {
      board: Array.from(Array(COLS), () => new Array(ROWS).fill(0)),
      currentPlayer: P1,
      isPlayable: true,
    };
  }

  resetBoard = () => {
    this.setState(this.getInitialBoardState());
  }

  makeTurn(colIndex) {
    this.setState(({ board, currentPlayer }) => {
      const currentCol = board[colIndex];
      const newChipColumnIndex = getLastNullishValueIndex(currentCol);

      if (newChipColumnIndex === -1) {
        return;
      }

      // Place new chip
      currentCol[newChipColumnIndex] = currentPlayer;

      const isThereWin = isThereWinCondition(board, {
        colId: colIndex,
        rowId: newChipColumnIndex,
      });

      if (isThereWin) {
        console.log('win condition for player', currentPlayer);

        if (this.props.onGameEnd) {
          this.props.onGameEnd(currentPlayer);
        }

        return {
          board,
          currentPlayer: (currentPlayer === P1) ? P2 : P1,
          isPlayable: false,
        };
      }

      return {
        board,
        currentPlayer: (currentPlayer === P1) ? P2 : P1,
      };
    });
  }

  render() {
    const { board, currentPlayer, isPlayable } = this.state;
    const currentPlayerTitle = currentPlayer === P1 ? 'First' : 'Second';

    return (
      <Wrapper>
        <Container>
          <StatusBar>
            {/* TODO: Add winner's text */}
            <span>
              <b>{currentPlayerTitle}</b>&nbsp;player&#39;s turn&nbsp;
            </span>
            <ResetBtn
              onClick={this.resetBoard}
              isPlayable={isPlayable}
            >
              Reset board
            </ResetBtn>
          </StatusBar>
          <ColumnsWrapper>
            {
              board.map((col, colIndex) => (
                <Column
                  key={colIndex}
                  isPlayable={isPlayable}
                  onClick={() => isPlayable && this.makeTurn(colIndex)}
                >
                  {
                    col.map((cell, cellIndex) => <Cell key={cellIndex} value={cell} />)
                  }
                </Column>
              ))
            }
          </ColumnsWrapper>
        </Container>
      </Wrapper>
    );
  }
}

GameBoard.propTypes = {
  onGameEnd: PropTypes.func,
};

export default GameBoard;
