import React, { Component } from 'react';
import ChessBoard from './components/board/ChessBoard';
import positionStandard from './chess/position-standard';
import './App.css';
import './chess/pieces.css';

class App extends Component {

  render() {
    const board = {
      size: 480,
      theme: 'theme-tournament',
      position: positionStandard,
    };
    return (
      <div className="app">
        <ChessBoard {...board} />
      </div>
    );
  }

}

export default App;
