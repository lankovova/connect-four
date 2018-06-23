import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import GameBoard from './GameBoard';
import Scoreboard from './Scoreborad';

const AppWrapper = styled.div`
  padding: 10px;
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
      newScore[winner] += 1;

      return { score: newScore };
    });
  }

  render() {
    const { score } = this.state;

    return (
      <AppWrapper>
        <Header />
        <GameBoard onGameEnd={this.onGameEnd} />
        <Scoreboard score={score} />
      </AppWrapper>
    );
  }
}

export default App;
