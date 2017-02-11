import React, { Component, PropTypes } from 'react';
import * as PIECES from './pieces';

import './ChessBoard.css';
import './themes/tournament.css';
import './pieces.css';

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const NUMBERS = [8, 7, 6, 5, 4, 3, 2, 1];

class ChessBoard extends Component {

  render() {
    const { size, theme } = this.props;
    const gutterIdeal = size / 17;
    const gutter = (gutterIdeal < 12) ? 0 : gutterIdeal;
    const square = (size - gutter) / 8;
    const style = {
      width: `${size}px`,
      height: `${size}px`,
    };
    const className = `chess-board ${theme}`;
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
      const style = {
        height: `${(index < 8) ? square : gutter}px`
      };
      return (
        <tr key={index} style={style}>
          {this.renderNumberGutter(index, gutter, square)}
          {this.renderSquares(square, index)}
        </tr>
      );
    });
    rows.push(this.renderLetterGutter(gutter, square));
    return rows;
  }

  renderNumberGutter(index, gutter, square) {
    if (gutter === 0) {
      return null;
    }
    const style = {
      width: `${gutter}px`,
      fontSize: `${gutter * 0.5}px`,
      // paddingRight: `${gutter * 0.2}px`,
    };
    return <td className="grid-number" style={style}>{NUMBERS[index]}</td>;
  }

  renderLetterGutter(gutter, square) {
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
      <tr key="letters" style={styleTr}>
        <td className="grid-empty"></td>
        {td}
      </tr>
    );
  }

  renderSquares(square, row) {
    const style = { width: `${square}px` };
    let color = (row % 2 === 0) ? 'light' : 'dark';
    return Array(8).fill().map((blank, index) => {
      const letter = LETTERS[index];
      const number = NUMBERS[row];
      const position = `${letter}${number}`;
      const highlight = (position === 'a8' || position === 'b8') ? 'highlight' : null;
      const className = `board-square ${color}-square ${position} ${highlight}`;
      const side = (color === 'light') ? 'white' : 'black';
      color = (color === 'light') ? 'dark' : 'light';
      return (
        <td className={className} style={style} key={index}>
          <span className="highlight"></span>
          {this.renderPiece(`${side}-king`, square)}
        </td>
      );
    });
  }

  renderPiece(piece, square) {
    const style = { fontSize: `${square * 0.8}px` };
    return (
      <span className={`chess-piece ${piece}`} style={style} />
    );
  }
}

ChessBoard.propTypes = {
  size: PropTypes.number,
  theme: PropTypes.string,
};

ChessBoard.defaultProps = {
  size: 480,
  theme: null,
};

export default ChessBoard;
