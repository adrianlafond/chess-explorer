import React, { Component, PropTypes } from 'react';
import * as PIECES from './pieces';

import './ChessBoard.css';
import './pieces.css';

const THRESHOLD_SIZE = 250;

class ChessBoard extends Component {

  render() {
    const { size } = this.props;
    const gutterIdeal = size / 17;
    const gutter = (gutterIdeal < 12) ? 0 : gutterIdeal;
    const square = (size - gutter) / 8;
    const style = {
      width: `${size}px`,
      height: `${size}px`,
    };
    const boardSize = size >= THRESHOLD_SIZE ? 'large' : 'small';
    const className = `chess-board ${boardSize}`;
    return (
      <div className={className} style={style}>
        <table>
          <tbody>
            {this.renderRows(gutter, square)}
          </tbody>
        </table>
      </div>
    );
    // {this.renderGridNumbers(square, gutter)}
    // <p className="grid-label">a</p>
    //       {this.renderPieces()}
  }

  renderRows(gutter, square) {
    const rows = Array(8).fill().map((blank, index) => {
      const style = {
        height: `${(index < 8) ? square : gutter}px`
      };
      return (
        <tr key={index} style={style}>
          {this.renderNumberGutter(index, gutter, square)}
          {this.renderSquares(square, index % 2 === 0)}
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
    return (index < 8) ?
      <td className="grid-number" style={style}>{8 - index}</td> :
      <td className="grid-empty" style={style}></td>;
  }

  renderLetterGutter(gutter, square) {
    const styleTr = { height: `${gutter}px` };
    const styleLetter = { fontSize: `${gutter * 0.5}px` };
    return (
      <tr key="letters" style={styleTr}>
        <td className="grid-empty"></td>
        <td className="grid-letter" style={styleLetter}>a</td>
        <td className="grid-letter" style={styleLetter}>b</td>
        <td className="grid-letter" style={styleLetter}>c</td>
        <td className="grid-letter" style={styleLetter}>d</td>
        <td className="grid-letter" style={styleLetter}>e</td>
        <td className="grid-letter" style={styleLetter}>f</td>
        <td className="grid-letter" style={styleLetter}>g</td>
        <td className="grid-letter" style={styleLetter}>h</td>
      </tr>
    );
  }

  renderSquares(square, light) {
    const style = { width: `${square}px` };
    let color = light ? 'light' : 'dark';
    return Array(8).fill().map((blank, index) => {
      const className = `board-square ${color}`;
      color = (color === 'light') ? 'dark' : 'light';
      return <td className={className} style={style} key={index}></td>;
    });
  }

  renderPieces() {
    const pieces = Object.keys(PIECES).map((key, index) => {
      const className = `${PIECES[key]} chess-piece`;
      return <span key={index} className={className} />;
    });
    return (<div>{pieces}</div>);
  }
}

ChessBoard.propTypes = {
  size: PropTypes.number,
};

ChessBoard.defaultProps = {
  size: 480,
};

export default ChessBoard;
