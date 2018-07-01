import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import MainPanel from './MainPanel';
import Scoreboard from './Scoreborad';
import { P1, P2 } from '../constansts';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: 100vw;
  height: 100vh;
`;

class App extends React.Component {
  state = {
    score: {
      player1: 0,
      player2: 0,
    },
  };

  onGameEnd = (winner) => {
    this.setState(({ score }) => {
      const newScore = { ...score };

      switch (winner) {
        case P1:
          newScore.player1 += 1;
          break;
        case P2:
          newScore.player2 += 1;
          break;
        default: throw new Error('Unknown player value');
      }

      return { score: newScore };
    });
  }

  render() {
    const { score } = this.state;

    return (
      <Wrapper>
        <Header />
        <MainPanel onGameEnd={this.onGameEnd} />
        <Scoreboard score={score} />
      </Wrapper>
    );
  }
}

export default App;
