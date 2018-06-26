import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0;
  font-weight: 900;
  text-transform: uppercase;
`;

const Scoreboard = ({ score }) => (
  <Bar>
    <div>Score: {score.player1} - {score.player2}</div>
  </Bar>
);

Scoreboard.propTypes = {
  score: PropTypes.shape({
    player1: PropTypes.number.isRequired,
    player2: PropTypes.number.isRequired,
  }).isRequired,
};

export default Scoreboard;
