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
  const n = Math.sqrt(pieces.length);
  let parity = 0;

  for(let i = 0; i < pieces.length; i++) {

    let value = pieces[i];

    if (value === 0) {
      if (n % 2 === 0) {
        parity += n - 1 - (i / n | 0);
      }
      continue;
    }

    for(let j = i + 1; j < pieces.length; j++) {
      if (pieces[j] < value && pieces[j] !== 0) {
        parity += 1;
      }
    }
  }

  return parity % 2 === 0;
}

export function isSorted(pieces) {
  return pieces.every((val, i, arr) => !i || (val >= arr[i - 1]));
}