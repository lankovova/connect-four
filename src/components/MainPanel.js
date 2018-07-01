import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  getNextTurnChipIndexInCol,
  isThereWinCondition,
  isBoardHasEmptyCells,
} from '../utils';
import { ROWS, COLS, EMPTY_CELL, P1, P2 } from '../constansts';
import StatusBar from './StatusBar';
import Board from './Board';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class MainPanel extends React.Component {
  state = this.getInitialBoardState();

  getInitialBoardState() {
    return {
      board: Array.from(new Array(COLS), () => new Array(ROWS).fill(EMPTY_CELL)),
      currentPlayer: P1,
      isPlayable: true,
      winner: null,
    };
  }

  resetBoard = () => this.setState(this.getInitialBoardState());

  makeTurn = (colIndex) => {
    if (!this.state.isPlayable) return;

    this.setState(({ board, currentPlayer }) => {
      const currentCol = board[colIndex];
      const newChipColumnIndex = getNextTurnChipIndexInCol(currentCol);

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
          winner: currentPlayer,
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
    const { board, currentPlayer, winner, isPlayable } = this.state;

    return (
      <Wrapper>
        <div>
          <StatusBar
            currentPlayer={currentPlayer}
            isPlayable={isPlayable}
            winner={winner}
            onResetClick={this.resetBoard}
          />
          <Board
            board={board}
            isPlayable={isPlayable}
            onColumnClick={this.makeTurn}
          />
        </div>
      </Wrapper>
    );
  }
}

MainPanel.propTypes = {
  onGameEnd: PropTypes.func,
};

export default MainPanel;
