import { canBeSolved, isSorted, shufflePuzzle } from "./../src/js/helpers";

describe("Helpers ", () => {

  it("should invalid games return false", () => {
    const piecesA = [1, 2, 3, 6, 8, 4, 5, 7, 0];
    const piecesB = [1, 2, 3, 4, 5, 6, 8, 7, 0];
    const piecesC = [1, 5, 0, 3, 2, 8, 4, 6, 7];
    const piecesD = [13, 10, 11, 6, 5, 7, 4, 8, 1, 12, 14, 9, 3, 15, 2, 0];
    const piecesE = [3, 9, 1, 15, 14, 11, 4, 6, 13, 0, 10, 12, 2, 7, 8, 5];
    const piecesF = [15, 2, 1, 12, 8, 5, 6, 11, 4, 9, 10, 7, 3, 14, 13];
    const piecesG = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, 0];

    expect(canBeSolved(piecesA)).to.be.false;
    expect(canBeSolved(piecesB)).to.be.false;
    expect(canBeSolved(piecesC)).to.be.false;
    expect(canBeSolved(piecesD)).to.be.false;
    expect(canBeSolved(piecesE)).to.be.false;
    expect(canBeSolved(piecesF)).to.be.false;
    expect(canBeSolved(piecesG)).to.be.false;
  });

  it("should valid games return true", () => {
    const piecesA = [0, 1, 2, 4, 5, 3, 7, 8, 6];
    const piecesB = [1, 2, 3, 0, 4, 6, 7, 5, 8];
    const piecesC = [1, 0, 3, 7, 2, 5, 8, 4, 6];
    const piecesD = [13, 2, 10, 3, 1, 12, 8, 4, 5, 0, 9, 6, 15, 14, 11, 7];
    const piecesE = [6, 13, 7, 10, 8, 9, 11, 0, 15, 2, 12, 5, 14, 3, 1, 4];
    const piecesF = [1, 2, 3, 4, 5, 6, 7, 8, 0, 9, 10, 11, 12, 13, 14, 15];

    expect(canBeSolved(piecesA)).to.be.true;
    expect(canBeSolved(piecesB)).to.be.true;
    expect(canBeSolved(piecesC)).to.be.true;
    expect(canBeSolved(piecesD)).to.be.true;
    expect(canBeSolved(piecesE)).to.be.true;
    expect(canBeSolved(piecesF)).to.be.true;
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