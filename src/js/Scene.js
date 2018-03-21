import Phaser from "phaser";

export default class Scene extends Phaser.Scene {
  constructor() {
    super();
    this.rows = 4;
    this.columns = 4;
  }

  preload() {
    this.load.spritesheet("background", "../static/images/monks.jpg",
      {frameWidth: this.sys.game.config.width / this.rows, frameHeight: this.sys.game.config.height / this.columns});
  }

  create() {
    let piecesIndex = 0,
      i, j,
      piece;
    const PIECE_WIDTH = this.sys.game.config.width / this.rows;
    const PIECE_HEIGHT = this.sys.game.config.height / this.columns;

    const piecesAmount = this.rows * this.columns;

    const shuffledIndexArray = this.createShuffledIndexArray(piecesAmount);
    const that = this;

    let piecesGroup = this.add.group();
    for(i = 0; i < this.rows; i++) {
      for(j = 0; j < this.columns; j++) {
        if (shuffledIndexArray[piecesIndex]) {
          piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "background", shuffledIndexArray[piecesIndex])
            .setOrigin(0)
            .setInteractive();
        }
        else {
          //the black tile
          piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT)
            .setOrigin(0)
            .setInteractive();
          piece.black = true;
        }
        piece.name = `piece-${i}x${j}y`;
        piece.currentIndex = piecesIndex;
        piece.destIndex = shuffledIndexArray[piecesIndex];
        piece.posX = j;
        piece.posY = i;
        piece.inputEnabled = true;
        piece.on("pointerdown", function() {
          that.selectPiece(this, piecesGroup);
        });
        piecesIndex++;
      }
    }

  }

  selectPiece(piece, piecesGroup) {

    var blackPiece = this.canMove(piece, piecesGroup);
    //if there is a black piece in neighborhood
    if (blackPiece) {
      this.movePiece(piece, blackPiece, piecesGroup);
    }

  }

  canMove(piece, piecesGroup) {
    let foundBlackElem = false;
    piecesGroup.getChildren().forEach((element) => {
      if (element.posX === (piece.posX - 1) && element.posY === piece.posY && element.black ||
        element.posX === (piece.posX + 1) && element.posY === piece.posY && element.black ||
        element.posY === (piece.posY - 1) && element.posX === piece.posX && element.black ||
        element.posY === (piece.posY + 1) && element.posX === piece.posX && element.black) {
        foundBlackElem = element;
        return;
      }
    });
    return foundBlackElem;
  }

  movePiece(piece, blackPiece, piecesGroup) {
    let tmpPiece = {
      posX: piece.posX,
      posY: piece.posY,
      currentIndex: piece.currentIndex
    };

    this.tweens.add({
      targets: blackPiece,
      x: blackPiece.posX * (this.sys.game.config.width / this.rows),
      y: blackPiece.posY * (this.sys.game.config.height / this.columns),
      duration: 1000,
      ease: Phaser.Math.Easing.Linear
    });

    //change places of piece and blackPiece
    piece.posX = blackPiece.posX;
    piece.posY = blackPiece.posY;
    piece.currentIndex = blackPiece.currentIndex;
    piece.name = `piece-${piece.posX}x${piece.posY}y`;

    //piece is the new black
    blackPiece.posX = tmpPiece.posX;
    blackPiece.posY = tmpPiece.posY;
    blackPiece.currentIndex = tmpPiece.currentIndex;
    blackPiece.name = `piece-${blackPiece.posX}x${blackPiece.posY}y`;
    blackPiece.width = piece.width;
    blackPiece.height = piece.height;

    //after every move check if puzzle is completed
    this.checkIfFinished(piecesGroup);
  }

  checkIfFinished(piecesGroup) {

    var isFinished = true;

    piecesGroup.getChildren().forEach(function(element) {
      if (element.currentIndex !== element.destIndex) {
        isFinished = false;
        return;
      }
    });

    if (isFinished) {
      this.showFinishedText();
    }

  }

  showFinishedText() {

    var style = {font: "40px Arial", fill: "red", align: "center"};

    var text = this.add.text(this.world.centerX, this.world.centerY, "Congratulations! \n You win!", style);

    text.anchor.set(0.5);

  }

  createShuffledIndexArray(piecesAmount) {

    var indexArray = [];

    for(var i = 0; i < piecesAmount; i++) {
      indexArray.push(i);
    }

    return this.shuffle(indexArray);

  }

  shuffle(array) {

    var counter = array.length,
      temp,
      index;

    while(counter > 0) {
      index = Math.floor(Math.random() * counter);

      counter--;

      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;

  }

}