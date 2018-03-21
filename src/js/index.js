import Phaser from "phaser";
import Scene from "./Scene";

const gameWidth = 800,
  gameHeight = 600;

let config = {
  title: "Media Monks Puzzle",
  version: "1.0",
  url: "https://github.com/avaleriani/picture-puzzle",
  hidePhaser: true,
  autoResize: true,
  width: gameWidth,
  height: gameHeight,
  parent: document.getElementById("game"),
  scene: [
    Scene
  ]
};
let game = new Phaser.Game(config);

