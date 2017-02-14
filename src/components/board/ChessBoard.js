import React, { Component, PropTypes } from 'react';
import board from '../../chess/board';
import './ChessBoard.css';
import './themes/tournament.css';

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const NUMBERS = [8, 7, 6, 5, 4, 3, 2, 1];

class ChessBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
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
      const highlight = '';
      // const active = (block === 'a8' || block === 'b8' || block === 'a1' || block === 'b1') ? 'active' : '';
      // const highlight = (block === 'b7' || block === 'c7' || block === 'b2' || block === 'c2') ? 'highlight' : '';
      const active = position[block].active ? 'active' : '';
      const color = position[block].light ? 'light' : 'dark';
      const className = `board-square ${color}-square ${block} ${highlight} ${active}`;
      const piece = position[block].piece;
      td.push(
        <td className={className} style={style} key={block}>
          <button className="chess-block-hit"
            onMouseDown={this.onSquareDown.bind(this)}
            onMouseEnter={this.onSquareEnter.bind(this)}
            onMouseLeave={this.onSquareLeave.bind(this)}
            data-block={block}>
            {this.renderPiece(piece, square)}
          </button>
        </td>
      );
    }
    return td;
  }

  renderPiece(piece, square) {
    const style = { fontSize: `${square * 0.9}px` };
    return (
      <span
        className={`chess-piece ${piece}`}
        style={style}  />
    );
  }

  onSquareDown(event) {
    const square = event.target.getAttribute('data-block');
    console.log(square);
    this.setState({ active: true });
    const position = this.props.position;
    this.props.onAction({ square, position });
    window.addEventListener('mouseup', this.onSquareUp.bind(this), false);
    event.preventDefault();
  }

  onSquareEnter(event) {
    if (this.state.active) {
      const block = event.target.getAttribute('data-block');
      console.log('mouse:enter:', block);
    }
  }

  onSquareLeave(event) {
    if (this.state.active) {
      const block = event.target.getAttribute('data-block');
      console.log('mouse:leave:', block);
    }
  }

  onSquareUp(event) {
    console.log('UP')
    this.setState({ active: false });
    window.removeEventListener('mouseup', this.onSquareUp.bind(this), false);
    event.preventDefault();
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onSquareUp, false);
  }
}

ChessBoard.propTypes = {
  size: PropTypes.number,
  theme: PropTypes.string,
  position: PropTypes.object,
  onAction: PropTypes.func.isRequired,
};

ChessBoard.defaultProps = {
  size: 480,
  theme: null,
  position: board
};

export default ChessBoard;
