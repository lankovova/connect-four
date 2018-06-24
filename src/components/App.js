import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import GameBoard from './GameBoard';
import Scoreboard from './Scoreborad';

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
      newScore[winner] += 1;

      return { score: newScore };
    });
  }

  render() {
    const { score } = this.state;

    return (
      <Wrapper>
        <Header />
        <GameBoard onGameEnd={this.onGameEnd} />
        <Scoreboard score={score} />
      </Wrapper>
    );
  }
}

export default App;
