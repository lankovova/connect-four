import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  justify-content: center;
`;

const Scoreboard = ({ score }) => (
  <Bar>
    <div>Score: {score.player1} - {score.player2}</div>
  </Bar>
);

export default Scoreboard;
