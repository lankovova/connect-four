import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Cell from './Cell';

const Wrapper = styled.div`
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

const Board = ({ board, isPlayable, onColumnClick }) => (
  <Wrapper>
    {
      board.map((col, colIndex) => (
        <Column
          key={colIndex}
          isPlayable={isPlayable}
          onClick={() => onColumnClick(colIndex)}
        >
          {
            col.map((cell, cellIndex) => <Cell key={cellIndex} player={cell} />)
          }
        </Column>
      ))
    }
  </Wrapper>
);

Board.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired,
  ).isRequired,
  isPlayable: PropTypes.bool.isRequired,
  onColumnClick: PropTypes.func.isRequired,
};

export default Board;
