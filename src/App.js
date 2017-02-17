import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGame } from './actions';
import ChessBoard from './components/ChessBoard';
import './App.css';
import './chess/pieces.css';


class App extends Component {

  componentWillMount() {
    this.props.dispatch(createGame());
  }

  render() {
    const { dispatch, games } = this.props;
    const board = {
      size: 540,
      // theme: 'theme-tournament',
      dispatch,
      game: games[0]
    };
    return (
      <div className="app">
        <ChessBoard {...board} />
      </div>
    );
  }
  //
  // onChessBoardAction(action) {
  //   this.setState({ position: chessAction(action) });
  // }
}

const mapStateToProps = (state, props) => ({...state});

export default connect(mapStateToProps)(App);
