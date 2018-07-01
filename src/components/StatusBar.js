import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { blink } from '../styles-utils';
import { P1, P2 } from '../constansts';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
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

const StatusBar = ({ currentPlayer, isPlayable, onResetClick }) => {
  const currentPlayerTitle = (currentPlayer === P1) ? 'First' : 'Second';

  return (
    <Wrapper>
      {/* TODO: Add winner's text */}
      <span>
        <b>{currentPlayerTitle}</b>&nbsp;player&#39;s turn&nbsp;
      </span>
      <ResetBtn
        onClick={onResetClick}
        isPlayable={isPlayable}
      >
        Reset
      </ResetBtn>
    </Wrapper>
  );
};

StatusBar.propTypes = {
  currentPlayer: PropTypes.oneOf([P1, P2]).isRequired,
  isPlayable: PropTypes.bool.isRequired,
  onResetClick: PropTypes.func,
};

export default StatusBar;
