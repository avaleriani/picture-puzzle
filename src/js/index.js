import Phaser from "phaser";

export default class Puzzle {
  constructor() {
    this.gameWidth = 800;
    this.gameHeight = 600;
    this.matrixSize = 4;
    this.pieceWidth = this.gameWidth / this.matrixSize;
    this.pieceHeight = this.gameHeight / this.matrixSize;

    this.puzzle = new Phaser.Game(this.gameWidth, this.gameHeight, Phaser.AUTO, "sliding-puzzle", {
      preload: this.preload,
      create: this.create
    });
  }

  preload() {
    this.puzzle.load.spritesheet("background", "../static/images/monks.jpg", this.pieceWidth, this.pieceHeight);
  }

  create() {
    let piecesIndex = 0,
      i, j,
      piece;

    const BOARD_COLS = Math.floor(this.puzzle.world.width / this.pieceWidth);
    const BOARD_ROWS = Math.floor(this.puzzle.world.height / this.pieceHeight);

    let piecesAmount = BOARD_COLS * BOARD_ROWS;
    console.log(piecesAmount)
    //
    // shuffledIndexArray = createShuffledIndexArray();
    //
    // piecesGroup = game.add.group();
    //
    // for(i = 0; i < BOARD_ROWS; i++) {
    //   for(j = 0; j < BOARD_COLS; j++) {
    //     if (shuffledIndexArray[piecesIndex]) {
    //       piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "background", shuffledIndexArray[piecesIndex]);
    //     }
    //     else { //initial position of black piece
    //       piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT);
    //       piece.black = true;
    //     }
    //     piece.name = 'piece' + i.toString() + 'x' + j.toString();
    //     piece.currentIndex = piecesIndex;
    //     piece.destIndex = shuffledIndexArray[piecesIndex];
    //     piece.inputEnabled = true;
    //     piece.events.onInputDown.add(selectPiece, this);
    //     piece.posX = j;
    //     piece.posY = i;
    //     piecesIndex++;
    //   }
    // }

  }
}

