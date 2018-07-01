import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ROWS, COLS, EMPTY_CELL, P1, P2 } from '../constansts';

const MIN_DIMENSION = Math.min(
  document.documentElement.clientHeight,
  document.documentElement.clientWidth
);

const MIN_DIMENSION_ITEMS_AMOUNT = (
  document.documentElement.clientHeight < document.documentElement.clientWidth
) ? ROWS
  : COLS;

const CELL_SIZE = MIN_DIMENSION * 0.65 / MIN_DIMENSION_ITEMS_AMOUNT;

const Cell = styled.div`
  margin: 5px;
  height: ${CELL_SIZE}px;
  width: ${CELL_SIZE}px;
  border: 5px solid;
  border-radius: 50%;
  border-color: ${({ player }) => {
    switch (player) {
      case EMPTY_CELL: return 'white';
      case P1: return '#e5c902';
      case P2: return '#e10005';
      default: throw new Error('Unknown cell value');
    }
  }};
  background: ${({ player }) => {
    switch (player) {
      case EMPTY_CELL: return 'white';
      case P1: return '#FFF001';
      case P2: return '#ff3136';
      default: throw new Error('Unknown cell value');
    }
  }};
`;

Cell.propTypes = {
  player: PropTypes.oneOf([EMPTY_CELL, P1, P2]).isRequired,
};

export default Cell;
