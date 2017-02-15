import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import ChessBoard from './components/board/ChessBoard';
import chessAction from './chess/action';
import positionStandard from './chess/position-standard';
import './App.css';
import './chess/pieces.css';

const store = createStore(reducer);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: positionStandard,
    };
  }

  render() {
    const { position } = this.state;
    const board = {
      size: 540,
      // theme: 'theme-tournament',
      position,
      onAction: this.onChessBoardAction.bind(this)
    };
    return (
      <Provider className="app" store={store}>
        <ChessBoard {...board} />
      </Provider>
    );
  }

  onChessBoardAction(action) {
    this.setState({ position: chessAction(action) });
  }
}

export default App;
