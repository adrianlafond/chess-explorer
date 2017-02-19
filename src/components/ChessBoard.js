import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {
  startSquare,
  enterSquare,
  exitSquare,
  completeSquare,
} from '../actions';
import * as drag from './util/drag';
import './ChessBoard.css';
import './themes/tournament.css';

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const NUMBERS = [8, 7, 6, 5, 4, 3, 2, 1];

class ChessBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      offsetX: 0,
      offsetY: 0,
      activePiece: null,
    };
  }

  render() {
    const { size, theme } = this.props;
    const gutterIdeal = size / 18;
    const gutter = (gutterIdeal < 12) ? 0 : gutterIdeal;
    const square = (size - gutter * 2) / 8;
    const boardSize = (gutter === 0) ? 'small' : 'large';
    const style = {
      width: `${size}px`,
      height: `${size}px`,
    };
    const className = `chess-board ${theme || ''} ${boardSize}`;
    return (
      <div className={className} style={style}>
        <table>
          <tbody>
            {this.renderRows(gutter, square)}
          </tbody>
        </table>
        {this.renderDragPiece(square)}
      </div>
    );
  }

  renderRows(gutter, square) {
    const rows = Array(8).fill().map((blank, index) => {
      const style = { height: `${square}px` };
      return (
        <tr key={index} style={style}>
          {this.renderNumberGutter(index, gutter, square)}
          {this.renderSquares(square, index)}
          {this.renderNumberGutter(index, gutter, square)}
        </tr>
      );
    });
    rows.unshift(this.renderLetterGutter(gutter, square, 'letters-top'));
    rows.push(this.renderLetterGutter(gutter, square, 'letters-bot'));
    return rows;
  }

  renderNumberGutter(index, gutter, square) {
    if (gutter === 0) {
      return null;
    }
    const style = {
      width: `${gutter}px`,
      fontSize: `${gutter * 0.5}px`,
    };
    return <td className="grid-number" style={style}>{NUMBERS[index]}</td>;
  }

  renderLetterGutter(gutter, square, key) {
    if (gutter === 0) {
      return null;
    }
    const styleTr = { height: `${gutter}px` };
    const styleLetter = { fontSize: `${gutter * 0.5}px` };
    const td = LETTERS.map(letter => {
      return (
        <td className="grid-letter" style={styleLetter} key={letter}>
          {letter}
        </td>
      );
    });
    return (
      <tr key={key} style={styleTr}>
        <td className="grid-empty"></td>
        {td}
      </tr>
    );
  }

  renderSquares(square, rowIndex) {
    const style = { width: `${square}px`, height: `${square}px` };
    const row = 8 - rowIndex;
    const position = this.props.game ? this.props.game.position : null;
    const td = [];
    for (let i = 0; i < 8; i++) {
      const color = getSquareColor(7 - rowIndex, i);
      const block = `${LETTERS[i]}${row}`;
      const highlight = (position && position[block].highlight) ? 'highlight' : '';
      const active = (position && position[block].active) ? 'active' : '';
      const className = `board-square ${color}-square ${block} ${highlight} ${active}`;
      const piece = position ? position[block].piece : null;
      td.push(
        <td className={className} style={style} key={block}>
          <button className="chess-block-hit"
            onMouseDown={this.onSquareDown.bind(this)}
            onMouseEnter={this.onSquareEnter.bind(this)}
            onMouseLeave={this.onSquareLeave.bind(this)}
            data-block={block}>
            {this.renderPiece(piece, square, !!active)}
          </button>
        </td>
      );
    }
    return td;
  }

  renderPiece(piece, square, active) {
    if (piece && !active) {
      const style = { fontSize: `${square * 0.9}px` };
      return (
        <span
          className={`chess-piece ${piece}`}
          style={style}  />
      );
    }
    return null;
  }

  renderDragPiece(square) {
    const { activePiece: piece } = this.state;
    if (piece) {
      const px = `${square * 0.9}px`;
      const style = {
        fontSize: px,
        width: px,
        height: px,
      };
      return (
        <button className="chess-block-hit">
          <span
            className={`chess-piece active-piece ${piece}`}
            style={style}  />
        </button>
      );
    }
    return null;
  }

  onSquareDown(event) {
    const { dispatch, game } = this.props;
    const square = event.target.getAttribute('data-block');
    const squrareRect = event.target.getBoundingClientRect();
    const activePiece = game.position[square].piece;
    if (activePiece) {
      this.setState({
        active: true,
        offsetX: squrareRect.left - drag.clientX(event),
        offsetY: squrareRect.top - drag.clientY(event),
        activePiece,
      });
    }
    dispatch(startSquare(game.id, square));
    window.addEventListener('mousemove', this.onPieceMove.bind(this), false);
    window.addEventListener('mouseup', this.onSquareUp.bind(this), false);
    event.preventDefault();
    this.onPieceMove(event);
  }

  onSquareEnter(event) {
    if (this.state.active) {
      const { dispatch, game } = this.props;
      const square = event.target.getAttribute('data-block');
      dispatch(enterSquare(game.id, square));
    }
  }

  onSquareLeave(event) {
    if (this.state.active) {
      const { dispatch, game } = this.props;
      const square = event.target.getAttribute('data-block');
      dispatch(exitSquare(game.id, square));
    }
  }

  onSquareUp(event) {
    const { dispatch, game } = this.props;
    this.setState({ active: false, activePiece: false });
    this.removeMoveListeners();
    event.preventDefault();
    dispatch(completeSquare(game.id));
  }

  onPieceMove(event) {
    const board = ReactDOM.findDOMNode(this);
    const piece = board.querySelector('.active-piece');
    if (piece) {
      const boardRect = board.getBoundingClientRect();
      piece.style.left = (drag.clientX(event) + this.state.offsetX -
        boardRect.left) + 'px';
      piece.style.top = (drag.clientY(event) + this.state.offsetY -
        boardRect.top) + 'px';
    }
  }

  componentWillUnmount() {
    this.removeMoveListeners();
  }

  removeMoveListeners() {
    window.removeEventListener('mousemove', this.onPieceMove.bind(this), false);
    window.removeEventListener('mouseup', this.onSquareUp, false);
  }
}

ChessBoard.propTypes = {
  size: PropTypes.number,
  theme: PropTypes.string,
  position: PropTypes.object,
  // onAction: PropTypes.func.isRequired,
};

ChessBoard.defaultProps = {
  size: 480,
  theme: null,
};

function getSquareColor(row, col) {
  if (row % 2 === 0) {
    return (col % 2 === 0) ? 'dark' : 'light';
  }
  return (col % 2 === 0) ? 'light' : 'dark';
}

export default ChessBoard
