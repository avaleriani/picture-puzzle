import Phaser from "phaser";

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

export function canBeSolved(pieces) {
  const rowCount = Math.sqrt(pieces.length);
  const inversions = getInversions(pieces);
  const blackTilePosition = findBlackTilePosition(pieces, rowCount);
  // If grid is odd, return true if inversion
  // count is even.
  if (!isEven(pieces.length)) {
    return isEven(inversions);
  } else {// grid is even
    if (!isEven(blackTilePosition)) {
      return isEven(inversions);
    } else {
      return !isEven(inversions);
    }
  }

}

function isEven(num) {
  return !(num % 2);
}

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

export function isSorted(pieces) {
  return pieces.every((value, index, arr) => !index || (value >= arr[index - 1]));
}