import React, { Component, PropTypes } from 'react';
import board from '../../chess/board';
import './ChessBoard.css';
import './themes/tournament.css';

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const NUMBERS = [8, 7, 6, 5, 4, 3, 2, 1];

class ChessBoard extends Component {

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
    const position = this.props.position;
    const td = [];
    for (let i = 0; i < 8; i++) {
      const block = `${LETTERS[i]}${row}`;
      const highlight = (block === 'a8' || block === 'b8' || block === 'a1' || block === 'b1') ? 'highlight' : '';
      const color = position[block].light ? 'light' : 'dark';
      const className = `board-square ${color}-square ${block} ${highlight}`;
      const piece = position[block].piece;
      td.push(
        <td className={className} style={style} key={block}>
          <span className="highlight"></span>
          {this.renderPiece(piece, square)}
        </td>
      );
    }
    return td;
  }

  renderPiece(piece, square) {
    const style = { fontSize: `${square * 0.9}px` };
    return (
      <span className={`chess-piece ${piece}`} style={style} />
    );
  }
}

ChessBoard.propTypes = {
  size: PropTypes.number,
  theme: PropTypes.string,
  position: PropTypes.object
};

ChessBoard.defaultProps = {
  size: 480,
  theme: null,
  position: board
};

export default ChessBoard;
