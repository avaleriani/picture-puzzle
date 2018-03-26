import GameManager from "./../src/js/index";
import SceneManager from "./../src/js/sceneManager";

describe("Scene Manager", () => {
  const element = document.createElement("div");
  const image = "../static/images/monks.jpg";
  let config = {};
  let game;
  let gameObj;

  before(() => {
    game = new GameManager();
    config = game.setConfig(element, image);
    gameObj = game.start(config);
  });

  it("should game be booted", () => {
    expect(gameObj.isBooted).to.be.true;
  });

  it("should be instance of Scene Manager", () => {
    const scene = new SceneManager(4, 4, image);
    expect(scene).to.be.instanceOf(SceneManager);
  });
});