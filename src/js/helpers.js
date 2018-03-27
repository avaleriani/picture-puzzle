import Phaser from "phaser";

/**
 * Generates an array with sequential numbers of the size of the puzzle tiles and shuffle it.
 * @param {number} piecesAmount - The quantity of tiles from the puzzle.
 */
export function shufflePuzzle(piecesAmount) {
  const shuffledPuzzle = Phaser.Actions.Shuffle(Phaser.Utils.Array.NumberArray(0, piecesAmount - 1));
  if (shuffledPuzzle) {
    if (!canBeSolved(shuffledPuzzle) || isSorted(shuffledPuzzle)) {
      return shufflePuzzle(piecesAmount);
    } else {
      return shuffledPuzzle;
    }
  }
}

/**
 * Checks if a random array of numbers will work as puzzle.
 * 1. If pieces quantity is odd and number of inversions is even, is solvable
 * 2. If pieces quantity  is even, then;
 *  a. The black square  is on an even row counting from the bottom and number of inversions is odd.
 *  b. The black  is on an odd row counting from the bottom and number of inversions is even.
 * 3. For all other cases, the puzzle instance is not solvable.
 *
 * Ref: https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/
 * @param {array} pieces - The array with the puzzle tiles position shuffled.
 */
export function canBeSolved(pieces) {
  const rowCount = Math.sqrt(pieces.length);
  const inversions = getInversions(pieces);
  const blackTilePosition = findBlackTilePosition(pieces, rowCount);
  if (!isEven(pieces.length)) {
    return isEven(inversions);
  } else {
    if (!isEven(blackTilePosition)) {
      return isEven(inversions);
    } else {
      return !isEven(inversions);
    }
  }
}

/**
 * Count the number of inversion. An inversion is when a number appears before the right position but is bigger
 * than the next number.
 * @param {array} pieces - The array with the puzzle tiles position shuffled.
 */
function getInversions(pieces) {
  let inversionsCount = 0;
  for(let i = 0; i < pieces.length - 1; i++) {
    for(let j = i + 1; j < pieces.length; j++) {
      if (pieces[j] && pieces[i] && pieces[i] > pieces[j])
        inversionsCount = inversionsCount + 1;
    }
  }
  return inversionsCount;
}

/**
 * Find the row, counting from the bottom, in which the black tile is located.
 * @param {array} pieces - The array with the puzzle tiles position shuffled.
 * @param {number} rowCount - The square of pieces length.
 */
function findBlackTilePosition(pieces, rowCount) {
  let rowNumberFromBottom = 1;
  let cellCounter = 1;
  for(let i = pieces.length - 1; i >= 0; i--) {
    if (cellCounter === rowCount) {
      cellCounter = 1;
      rowNumberFromBottom = rowNumberFromBottom + 1;
    } else {
      cellCounter = cellCounter + 1;
    }
    if (pieces[i] === 0) {
      return rowNumberFromBottom;
    }
  }
}


/**
 * Even = true
 * Odd = false
 * @param {number} num - Number to check
 */
function isEven(num) {
  return !(num % 2);
}

/**
 * Boolean if the array is sorted or not.
 * @param {array} pieces - The array with the puzzle tiles position shuffled.
 */
export function isSorted(pieces) {
  return pieces.every((value, index, arr) => !index || (value >= arr[index - 1]));
}