import Phaser from "phaser";
import { shufflePuzzle } from "./helpers";

export default class GameManager extends Phaser.Scene {
  constructor(rows, columns) {
    super();
    this.rows = rows;
    this.columns = columns;
    this.piecesGroup = [];
  }

  preload() {
    this.load.spritesheet("background", "../static/images/monks.jpg",
      {frameWidth: this.sys.game.config.width / this.rows, frameHeight: this.sys.game.config.height / this.columns});
  }

  create() {
    const pieceWidth = this.sys.game.config.width / this.rows;
    const pieceHeight = this.sys.game.config.height / this.columns;
    const piecesAmount = this.rows * this.columns;
    const shuffledIndexArray = shufflePuzzle(piecesAmount);
    const _self = this;
    let piecesIndex = 0;
    let piece;

    this.piecesGroup = this.add.group();

    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.columns; j++) {
        if (shuffledIndexArray[piecesIndex]) {
          piece = this.piecesGroup.create(j * pieceWidth, i * pieceHeight, "background", shuffledIndexArray[piecesIndex])
            .setOrigin(0)
            .setInteractive();
        }
        else {
          //the black tile
          piece = this.piecesGroup.create(j * pieceWidth, i * pieceHeight)
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
          _self.selectPiece(this);
        });
        piecesIndex++;
      }
    }
  }

  selectPiece(piece) {
    let blackPiece = this.canMove(piece);
    if (blackPiece) {
      this.movePiece(piece, blackPiece);
    }
  }

  movePiece(piece, blackPiece) {
    let tmpPiece = {
      posX: piece.posX,
      posY: piece.posY,
      currentIndex: piece.currentIndex
    };

    this.addTween(piece, blackPiece);

    //switch black and piece position
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

    //win?
    this.win(this.piecesGroup);
  }

  addTween(piece, blackPiece) {
    this.tweens.add({
      targets: piece,
      x: blackPiece.posX * (this.sys.game.config.width / this.rows),
      y: blackPiece.posY * (this.sys.game.config.height / this.columns),
      duration: 250,
      ease: Phaser.Math.Easing.Bounce
    });
  }

  canMove(piece) {
    const piecesGroupItems = this.piecesGroup.getChildren();
    const blackPieceIndex = piecesGroupItems.findIndex(element => {
      return (element.posX === (piece.posX - 1) && element.posY === piece.posY && element.black ||
        element.posX === (piece.posX + 1) && element.posY === piece.posY && element.black ||
        element.posY === (piece.posY - 1) && element.posX === piece.posX && element.black ||
        element.posY === (piece.posY + 1) && element.posX === piece.posX && element.black);
    });

    return blackPieceIndex ? piecesGroupItems[blackPieceIndex] : false;
  }

  win(piecesGroup) {
    const didWin = piecesGroup.getChildren().every(element => {
      console.log(element.currentIndex, element.destIndex)
      return (element.currentIndex !== element.destIndex);
    });
    console.log(didWin)
    if (didWin) {
      this.showWinMessage();
    }
  }

  showWinMessage() {
    const config1 = {
      x: 0,
      y: 0,
      width: this.sys.game.config.width,
      height: this.sys.game.config.height,
      text: "Congratulations! \n You win!",
      style: {
        font: "64px Helvetica",
        color: "white",
        align: "center",
        backgroundColor: "#red"
      }
    };
    this.make.text(config1);
  }
}