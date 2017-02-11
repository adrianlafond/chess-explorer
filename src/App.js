import React, { Component } from 'react';
import logo from './logo.svg';
import * as PIECES from './constants/pieces';
import './App.css';
import './components/board/pieces.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.renderPieces()}
      </div>
    );
  }

  renderPieces() {
    const pieces = Object.keys(PIECES).map((key, index) => {
      return <span key={index} className={PIECES[key]} />;
    });
    return (<p>{pieces}</p>);
  }
}

export default App;
