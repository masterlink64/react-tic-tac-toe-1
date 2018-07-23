import React, { Component } from 'react';
import Square from '../Square';

class Board extends Component {
  handleClick = (row, col) => {
    if (!this.props.frozen && !this.props.board[row][col]) {
      this.props.takeTurn(row, col);
    }
  };
  render() {
    return this.props.board.map((row, rowIdx) => {
      return row.map((squareVal, colIdx) => {
        return (
          <Square
            val={squareVal}
            key={`${rowIdx}|${colIdx}`}
            handleClick={this.handleClick.bind(this, rowIdx, colIdx)}
          />
        );
      });
    });
  }
}

export default Board;
