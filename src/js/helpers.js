import Phaser from "phaser";

export function shufflePuzzle(piecesAmount) {
  const shuffledPuzzle = Phaser.Actions.Shuffle(Phaser.Utils.Array.NumberArray(0, piecesAmount - 1));
  console.log(piecesAmount)
  if (shuffledPuzzle) {
    if (!isSolvable(shuffledPuzzle) || isSorted(shuffledPuzzle)) {
      return shufflePuzzle(piecesAmount);
    } else {
      return shuffledPuzzle;
    }
  }
}

export function isSolvable(pieces) {
  /*A puzzle is solvable if:
  _The width of the puzzle (count of columns) is odd and there are an even number of inversions.
  _The width of the puzzle is even, there are an even number of inversions, and  the empty tile is on a
  zero-based odd row counting up-from-bottom.
  _The width of the puzzle is even, there are an odd number of inversions, and the empty tile is on a
  zero-based even row counting up-from-bottom.
 */
  let parity = 0;
  let gridWidth = Math.sqrt(pieces.length);
  let row = 0;
  let blackRow = 0;

  for(let rowNumber = 0; rowNumber < pieces.length; rowNumber++) {
    if (rowNumber % gridWidth === 0) {
      row++;
    }
    if (pieces[rowNumber] === 0) { // the blank tile
      blackRow = row; // save the row on which encountered
      continue;
    }
    for(let colNumber = rowNumber + 1; colNumber < pieces.length; colNumber++) {
      if (pieces[colNumber] > pieces[colNumber] && pieces[colNumber] !== 0) {
        parity++;
      }
    }
  }

  if (gridWidth % 2 === 0) { // even grid
    if (blackRow % 2 === 0) { // blank on odd row
      return parity % 2 === 0;
    } else { // blank on even row
      return parity % 2 !== 0;
    }
  } else { // odd grid
    return parity % 2 === 0;
  }
}

export function isSorted(pieces) {
  return pieces.every((val, i, arr) => !i || (val >= arr[i - 1]));
}