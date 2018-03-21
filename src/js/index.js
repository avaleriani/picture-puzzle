import Phaser from "phaser";
import Scene from "./Scene";
import "./../scss/base.scss";

const gameWidth = 800,
  gameHeight = 600;

let config = {
  title: "Media Monks Puzzle",
  version: "1.0",
  url: "https://github.com/avaleriani/picture-puzzle",
  width: gameWidth,
  height: gameHeight,
  parent: document.getElementById("game"),
  scene: [
    Scene
  ]
};


window.addEventListener("load", () => {
  new Phaser.Game(config);
});

