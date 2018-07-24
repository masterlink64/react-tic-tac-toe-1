import React, { Component } from 'react';
import Board from '../Board';
import { didWin } from '../helpers';
import './style.css';

// the original game state
export const DEFAULT_STATE = {
  board: [[null, null, null], [null, null, null], [null, null, null]],
  currentPlayer: 'X',
  turn: 1,
  over: false,
  winner: null
};

/**
 * A helper function to compute the next turn based on the data from the old state
 * @param {Array} board a 2-dimensional array (matrix) representing the current board
 * @param {Object} position an object with a 'row' key and a 'col' key representing the coordinates for the player's turn
 * @param {String} player the mark for the current player, usually 'X' or 'O'
 * @param {Number} turn the current turn for the players
 * @return {Object} an object containing information for the next state: updatedBoard, nextPlayer, nextTurn
 */
export function processTurn(board, position, player, turn) {
  // make a deep copy of the current board
  let updatedBoard = [...board.map(c => [...c])];

  // put the player mark in place in the new board
  updatedBoard[position.row][position.col] = player;

  // change the player mark to the next player
  let nextPlayer = player === 'X' ? 'O' : 'X';

  // update the turn
  let nextTurn = turn + 1;

  // return an object containing updated state information
  return { updatedBoard, nextPlayer, nextTurn };
}

class App extends Component {
  // initialize to original game state
  state = DEFAULT_STATE;

  /**
   * A method that ends the turn, computes the updated game state,
   *  and checks whether there are winners or the game should end, and updates the
   *  game state accordingly
   *  @param {Number} row the y-index in the board matrix where the mark was placed
   *  @param {Number} col the x-index in the board matrix where the mark was placed
   */
  takeTurn = (row, col) => {
    let { updatedBoard, nextPlayer, nextTurn } = processTurn(
      this.state.board,
      { row, col },
      this.state.currentPlayer,
      this.state.turn
    );

    let winner = null;
    let over = false;

    if (didWin(updatedBoard)) {
      winner = this.state.currentPlayer;
      over = true;
    } else if (nextTurn === 10) {
      over = true;
    }

    this.setState({
      board: updatedBoard,
      currentPlayer: nextPlayer,
      turn: nextTurn,
      winner: winner,
      over: over
    });
  };

  renderAlert = () => {
    if (this.state.winner) {
      return alert(`${this.state.winner} WINS!`);
    } else {
      return alert("It's a DRAW!");
    }
  };

  resetGame = () => {
    this.setState(DEFAULT_STATE);
  };

  render() {
    return (
      <div id="board">
        {this.state.over && this.renderAlert()}
        <Board
          board={this.state.board}
          frozen={this.state.over}
          takeTurn={this.takeTurn}
        />
        {this.state.over && (
          <button id="resetButton" onClick={this.resetGame}>
            Play Again
          </button>
        )}
      </div>
    );
  }
}

export default App;
