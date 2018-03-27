import { Scene, Math } from "phaser";
import { shufflePuzzle } from "./helpers";

/** Class with game scene configuration and functionality. */
export default class SceneManager extends Scene {
  constructor(rows, columns, image) {
    super();
    this.rows = rows;
    this.columns = columns;
    this.piecesGroup = [];
    this.image = image;
  }

  /**
   * Loads assets to be used in the scene.
   */
  preload() {
    this.load.spritesheet("background", this.image,
      {frameWidth: this.sys.game.config.width / this.rows, frameHeight: this.sys.game.config.height / this.columns});
  }

  /**
   * Create the game.
   */
  create() {
    const pieceWidth = this.sys.game.config.width / this.rows;
    const pieceHeight = this.sys.game.config.height / this.columns;
    const piecesAmount = this.rows * this.columns;
    const shuffledIndexArray = shufflePuzzle(piecesAmount, this.rows, this.columns);
    const $this = this;
    let piecesIndex = 0;
    let piece;

    this.piecesGroup = this.add.group();
    for(let i = 0; i < this.rows; i++) {
      for(let j = 0; j < this.columns; j++) {
        if (shuffledIndexArray[piecesIndex] !== 0) {
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
          piece.visible = false;
        }
        piece.name = `piece-${i}x${j}y`;
        piece.currentIndex = piecesIndex;
        piece.destIndex = shuffledIndexArray[piecesIndex];
        piece.posX = j;
        piece.posY = i;
        piece.inputEnabled = true;
        piece.on("pointerdown", function() {
          $this.pickPieceToMove(this);
        });
        piecesIndex++;
      }
    }
  }

  /**
   * Verifies and move a piece if it's a valid movement.
   * @param {object} piece - The clicked piece.
   */
  pickPieceToMove(piece) {
    let blackTile = this.canMove(piece);
    if (blackTile) {
      this.movePiece(piece, blackTile);
    }
  }

  /**
   * Move the piece and adds a transition.
   * @param {object} piece - The clicked piece.
   * @param {object} blackTile - The black tile.
   */
  movePiece(piece, blackTile) {
    let tmpPiece = {
      posX: piece.posX,
      posY: piece.posY,
      currentIndex: piece.currentIndex
    };

    this.addTween(piece, blackTile);

    //switch black and piece position
    piece.posX = blackTile.posX;
    piece.posY = blackTile.posY;
    piece.currentIndex = blackTile.currentIndex;
    piece.name = `piece-${piece.posX}x${piece.posY}y`;

    //piece is the new black
    blackTile.posX = tmpPiece.posX;
    blackTile.posY = tmpPiece.posY;
    blackTile.currentIndex = tmpPiece.currentIndex;
    blackTile.name = `piece-${blackTile.posX}x${blackTile.posY}y`;
    blackTile.width = piece.width;
    blackTile.height = piece.height;

    //win?
    this.didWin(this.piecesGroup);
  }

  /**
   * Adds the transition to the moving piece.
   * @param {object} piece - The clicked piece.
   * @param {object} blackTile - The black tile.
   */
  addTween(piece, blackTile) {
    this.tweens.add({
      targets: piece,
      x: blackTile.posX * (this.sys.game.config.width / this.rows),
      y: blackTile.posY * (this.sys.game.config.height / this.columns),
      duration: 250,
      ease: Math.Easing.Bounce
    });
  }

  /**
   * Verifies if the clicked piece can move into the empty position.
   * @param {object} piece - The clicked piece.
   */
  canMove(piece) {
    const piecesGroupItems = this.piecesGroup.getChildren();
    const blackTileIndex = piecesGroupItems.findIndex(element => {
      return (element.posX === (piece.posX - 1) && element.posY === piece.posY && element.black ||
        element.posX === (piece.posX + 1) && element.posY === piece.posY && element.black ||
        element.posY === (piece.posY - 1) && element.posX === piece.posX && element.black ||
        element.posY === (piece.posY + 1) && element.posX === piece.posX && element.black);
    });

    return blackTileIndex ? piecesGroupItems[blackTileIndex] : false;
  }

  /**
   * Checks if the puzzle is in it's original position
   * @param {array} piecesGroup - The current tiles array.
   */
  didWin(piecesGroup) {
    const didWin = piecesGroup.getChildren().every(element => {
      return (element.currentIndex === element.destIndex);
    });
    if (didWin) {
      this.showWinMessage();
    }
  }

  /**
   * Shows the win message on game screen.
   */
  showWinMessage() {
    const config1 = {
      x: 60,
      y: 160,
      width: this.sys.game.config.width,
      height: this.sys.game.config.height,
      text: "YOU WIN!",
      style: {
        font: "80px Helvetica",
        color: "#000000",
        align: "center",
        backgroundColor: "#a7ff78"
      }
    };
    this.make.text(config1);
    this.piecesGroup.clear();
  }
}