import { canBeSolved, isSorted, shufflePuzzle } from "./../src/js/helpers";

describe("Helpers ", () => {
  //
  // it("should invalid games return false", () => {
  //   const piecesA = [1, 2, 3, 6, 8, 4, 5, 7, 0];
  //   const piecesB = [1, 2, 3, 4, 5, 6, 8, 7, 0];
  //   const piecesC = [1, 5, 0, 3, 2, 8, 4, 6, 7];
  // const piecesD = [13, 10, 11, 6, 5, 7, 4, 8, 1, 12, 14, 9, 3, 15, 2, 0];
  //
  //   expect(canBeSolved(piecesA)).to.be.false;
  //   expect(canBeSolved(piecesB)).to.be.false;
  //   expect(canBeSolved(piecesC)).to.be.false;
  //   expect(canBeSolved(piecesD)).to.be.false;
  // });

  it("should valid games return true", () => {
    const piecesA = [0, 1, 2, 4, 5, 3, 7, 8, 6];
    const piecesB = [1, 2, 3, 0, 4, 6, 7, 5, 8];
    const piecesC = [1, 0, 3, 7, 2, 5, 8, 4, 6];
    const piecesD = [13, 10, 11, 6, 5, 7, 4, 8, 1, 12, 14, 9, 3, 15, 0, 2];

    expect(canBeSolved(piecesA)).to.be.true;
    expect(canBeSolved(piecesB)).to.be.true;
    expect(canBeSolved(piecesC)).to.be.true;
    expect(canBeSolved(piecesD)).to.be.true;
  });

  it("should unordered array return false", () => {
    const pieces = [0, 1, 2, 3, 4, 5, 7, 6];

    expect(isSorted(pieces)).to.be.false;
  });

  it("should ordered array return true", () => {
    const pieces = [0, 1, 2, 3, 4, 5, 6];

    expect(isSorted(pieces)).to.be.true;
  });

  it("should return unordered and solvable array", () => {
    const pieces = shufflePuzzle(10);

    expect(isSorted(pieces)).to.be.false;
    expect(canBeSolved(pieces)).to.be.true;
  });
});