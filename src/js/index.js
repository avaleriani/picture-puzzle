import Phaser from "phaser";
import Scene from "./gameManager";
import "./../scss/base.scss";

const gameWidth = 500;
const gameHeight = 500;
const rowCount = 2;
const columnCount = 2;

let config = {
  title: "Media Monks Puzzle",
  version: "1.0",
  url: "https://github.com/avaleriani/picture-puzzle",
  width: gameWidth,
  height: gameHeight,
  parent: document.getElementById("game"),
  scene: [
    new Scene(rowCount, columnCount)
  ]
};


window.addEventListener("load", () => {
  new Phaser.Game(config);
});

