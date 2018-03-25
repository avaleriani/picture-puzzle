import Phaser from "phaser";
import Scene from "./sceneManager";
import "./../scss/base.scss";

export class GameManager {
  consturctor() {
    this.gameWidth = 500;
    this.gameHeight = 500;
    this.rowCount = 4;
    this.columnCount = 4;
    this.config = null;
  }

  setConfig() {
    return {
      title: "Media Monks Puzzle",
      version: "1.0",
      url: "https://github.com/avaleriani/picture-puzzle",
      width: this.gameWidth,
      height: this.gameHeight,
      parent: document.getElementById("game"),
      scene: [
        new Scene(this.rowCount, this.columnCount)
      ]
    };
  }

  start() {
    new Phaser.Game(this.setConfig());
  }
}

window.addEventListener("load", () => {
  new GameManager().start();
});

