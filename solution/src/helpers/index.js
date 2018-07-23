/**
 * An algorithm that takes a 2-dimensional array and checks for winning positions
 * @param {Array} board - a 2-dimensional (3x3) array
 */
export function didWin(board) {
  /* check rows and colums */
  for (let i = 0; i < board.length; i++) {
    // rows
    if (hasWinner(board[i][0], board[i][1], board[i][2])) {
      return true;
    }
    // columns
    if (hasWinner(board[0][i], board[1][i], board[2][i])) {
      return true;
    }
  }

  /* check diagonals */

  // left to right diagonal
  if (hasWinner(board[0][0], board[1][1], board[2][2])) {
    return true;
  }

  // right to left diagonal
  if (hasWinner(board[0][2], board[1][1], board[2][0])) {
    return true;
  }

  // if we haven't found a winner by here there is no winner
  return false;
}

/**
 * A function that takes three slots and checks for
 *   equality to determine a win or not
 * @param {Any} slot1
 * @param {Any} slot2
 * @param {Any} slot3
 */
function hasWinner(slot1, slot2, slot3) {
  if (!slot1 || !slot2 || !slot3) {
    return false;
  }
  return slot1 === slot2 && slot2 === slot3;
}
