export function shufflePuzzle(piecesAmount) {

  let sequentialArray = Array.from(Array(piecesAmount).keys());

  for(let i = sequentialArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [sequentialArray[i], sequentialArray[j]] = [sequentialArray[j], sequentialArray[i]];
  }
  return sequentialArray;
}