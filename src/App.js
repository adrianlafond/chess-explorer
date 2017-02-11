import React, { Component } from 'react';
import ChessBoard from './components/board/ChessBoard';
import './App.css';

class App extends Component {

  render() {
    // const size = 200;
    return (
      <div className="app">
        <ChessBoard size={100} theme="theme-green" />
        <ChessBoard size={480} theme="theme-green" />
      </div>
    );
  }

}

export default App;
