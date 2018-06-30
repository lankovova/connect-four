import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  getFirstEmptyCellIndexInCol,
  isThereWinCondition,
  isBoardHasEmptyCells,
} from '../utils';
import { blink } from '../styles-utils';
import {
  ROWS, COLS, EMPTY_CELL, P1, P2,
} from '../constansts';

const MIN_DIMENSION = Math.min(
  document.documentElement.clientHeight,
  document.documentElement.clientWidth
);

const MIN_DIMENSION_ITEMS_AMOUNT = (
  document.documentElement.clientHeight < document.documentElement.clientWidth
) ? ROWS
  : COLS;

const CELL_SIZE = MIN_DIMENSION * 0.7 / MIN_DIMENSION_ITEMS_AMOUNT;

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
  transition: background 100ms ease-in-out;

  &:hover {
    cursor: ${props => props.isPlayable && 'pointer'};
    background: ${props => props.isPlayable && '#99afff'};
  }
`;

const Cell = styled.div`
  margin: 5px;
  height: ${CELL_SIZE}px;
  width: ${CELL_SIZE}px;
  border: 5px solid;
  border-radius: 50%;
  border-color: ${({ player }) => {
    switch (player) {
      case P1: return '#e5c902';
      case P2: return '#e10005';
      default: return 'white';
    }
  }};
  background: ${({ player }) => {
    switch (player) {
      case P1: return '#FFF001';
      case P2: return '#ff3136';
      default: return 'white';
    }
  }};
`;

const ResetBtn = styled.div`
  border: 2px solid #b328fd;
  border-radius: 10px;
  cursor: pointer;
  padding: 0 15px;
  transition: all 200ms linear;

  background: ${props => props.isPlayable ? 'white' : '#b328fd'};
  color: ${props => props.isPlayable ? 'black' : 'white'};
  animation: ${props => !props.isPlayable && blink} 1000ms ease-in-out infinite;

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
      board: Array.from(new Array(COLS), () => new Array(ROWS).fill(EMPTY_CELL)),
      currentPlayer: P1,
      isPlayable: true,
    };
  }

  resetBoard = () => this.setState(this.getInitialBoardState());

  makeTurn(colIndex) {
    if (!this.state.isPlayable) return;

    this.setState(({ board, currentPlayer }) => {
      const currentCol = board[colIndex];
      const newChipColumnIndex = getFirstEmptyCellIndexInCol(currentCol);

      if (newChipColumnIndex === -1) {
        return;
      }

      /**
       * Place new chip by mutating reference to board column
       */
      currentCol[newChipColumnIndex] = currentPlayer;

      if (
        isThereWinCondition(board, {
          colId: colIndex,
          rowId: newChipColumnIndex,
        })
      ) {
        if (this.props.onGameEnd) {
          this.props.onGameEnd(currentPlayer);
        }

        return {
          board,
          currentPlayer: (currentPlayer === P1) ? P2 : P1,
          isPlayable: false,
        };
      }

      if (!isBoardHasEmptyCells(board)) {
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
              Reset
            </ResetBtn>
          </StatusBar>
          <ColumnsWrapper>
            {
              board.map((col, colIndex) => (
                <Column
                  key={colIndex}
                  isPlayable={isPlayable}
                  onClick={() => this.makeTurn(colIndex)}
                >
                  {
                    col.map((cell, cellIndex) => <Cell key={cellIndex} player={cell} />)
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
