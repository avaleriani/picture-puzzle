import { Game } from "phaser";
import Scene from "./sceneManager";
import "./../scss/base.scss";

export default class GameManager {
  constructor(width, height, rowCount, columnCount) {
    this.gameWidth = width ? width : 500;
    this.gameHeight = height ? height : 500;
    this.rowCount = rowCount ? rowCount : 4;
    this.columnCount = columnCount ? columnCount : 4;
    this.config = null;
  }

  setConfig(element, image) {
    const scene = new Scene(this.rowCount, this.columnCount, image);
    if (this.rowCount !== this.columnCount) {
      throw Error("Not square puzzles are not supported yet.");
    }
    return {
      title: "Media Monks Puzzle",
      version: "1.0",
      url: "https://github.com/avaleriani/picture-puzzle",
      width: this.gameWidth,
      height: this.gameHeight,
      parent: element,
      scene: [
        scene
      ]
    };
  }

  start(config) {
    return new Game(config);
  }
}

window.addEventListener("load", () => {
  const element = document.getElementById("game");
  const image = "../static/images/monks.jpg";
  const gm = new GameManager();
  const config = gm.setConfig(element, image);
  gm.start(config);
});

