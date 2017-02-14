import React, { Component } from 'react';
import ChessBoard from './components/board/ChessBoard';
import chessAction from './chess/action';
import positionStandard from './chess/position-standard';
import './App.css';
import './chess/pieces.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: positionStandard,
    };
  }

  render() {
    console.log('render()')
    const { position } = this.state;
    const board = {
      size: 540,
      // theme: 'theme-tournament',
      position,
      onAction: this.onChessBoardAction.bind(this)
    };
    return (
      <div className="app">
        <ChessBoard {...board} />
      </div>
    );
  }

  onChessBoardAction(action) {
    this.setState({ position: chessAction(action) });
  }
}

export default App;
