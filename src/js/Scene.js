import Phaser from "phaser";

export default class Scene extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.spritesheet("background", "../static/images/monks.jpg",
      {frameWidth: this.sys.game.config.width / 4, frameHeight: this.sys.game.config.height / 4});
  }

  create() {
    let piecesIndex = 0,
      i, j,
      piece;
    const BOARD_COLS = 4;
    const BOARD_ROWS = 4;
    const that = this;

    const piecesAmount = BOARD_COLS * BOARD_ROWS;

    const shuffledIndexArray = this.createShuffledIndexArray(piecesAmount);

    let piecesGroup = this.add.group();
    for(i = 0; i < BOARD_ROWS; i++) {
      for(j = 0; j < BOARD_COLS; j++) {

        if (shuffledIndexArray[piecesIndex]) {
          piece = piecesGroup.create(j * BOARD_COLS, i * BOARD_ROWS, "background", shuffledIndexArray[piecesIndex]);
        }
        else { //initial position of black piece
          piece = piecesGroup.create(j * BOARD_COLS, i * BOARD_ROWS);
          piece.black = true;
        }
        piece.name = "piece" + i.toString() + "x" + j.toString();
        piece.currentIndex = piecesIndex;
        piece.destIndex = shuffledIndexArray[piecesIndex];
        piece.inputEnabled = true;
        piece.posX = j;
        piece.posY = i;
        this.input.on("pointerdown", (event, piecesGroup) =>{
          console.log(event,that,  piecesGroup)
          that.selectPiece(event, piecesGroup);
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

    var foundBlackElem = false;
console.log(piecesGroup)
    piecesGroup.getChildren().forEach(function(element) {
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

    var tmpPiece = {
      posX: piece.posX,
      posY: piece.posY,
      currentIndex: piece.currentIndex
    };

    this.tweens.add({
      targets: piece,
      x: blackPiece.posX * 40,
      y: blackPiece.posY * 40,
      ease: "linear",
      duration: 300
    });
    //change places of piece and blackPiece
    piece.posX = blackPiece.posX;
    piece.posY = blackPiece.posY;
    piece.currentIndex = blackPiece.currentIndex;
    piece.name = "piece" + piece.posX.toString() + "x" + piece.posY.toString();

    //piece is the new black
    blackPiece.posX = tmpPiece.posX;
    blackPiece.posY = tmpPiece.posY;
    blackPiece.currentIndex = tmpPiece.currentIndex;
    blackPiece.name = "piece" + blackPiece.posX.toString() + "x" + blackPiece.posY.toString();

    //after every move check if puzzle is completed
    this.checkIfFinished(piecesGroup);
  }

  checkIfFinished(piecesGroup) {

    var isFinished = true;

    piecesGroup.children.forEach(function(element) {
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

    var style = {font: "40px Arial", fill: "#000", align: "center"};

    var text = this.add.text(this.world.centerX, this.world.centerY, "Congratulations! \nYou made it!", style);

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