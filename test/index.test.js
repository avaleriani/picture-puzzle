import GameManager from "./../src/js/index";

describe("Game Constructor", () => {
  const element = document.createElement("div");
  const image = "static/images/pont.jpg";
  let config = {};
  let game;

  before(() => {
    game = new GameManager();
    config = game.setConfig(element, image);
    game.start(config);
  });

  it("should be instance of GameManager", () => {
    expect(game).to.be.instanceOf(GameManager);
  });

  it("should constructor load default variables", () => {
    expect(game.gameWidth).to.be.equal(500);
    expect(game.gameHeight).to.be.equal(500);
    expect(game.rowCount).to.be.equal(4);
    expect(game.columnCount).to.be.equal(4);
    expect(game.config).to.be.equal(null);
  });

  it("should constructor load input variables", () => {
    const width = 456;
    const height = 654;
    const rowCount = 4;
    const columnCount = 5;
    const gameInit = new GameManager(width, height, rowCount, columnCount);

    expect(gameInit.gameWidth).to.be.equal(width);
    expect(gameInit.gameHeight).to.be.equal(height);
    expect(gameInit.rowCount).to.be.equal(rowCount);
    expect(gameInit.columnCount).to.be.equal(columnCount);
    expect(gameInit.config).to.be.equal(null);
  });

  it("should config match config object", () => {
    const configObjValue = game.setConfig(element, image);
    expect(configObjValue).to.deep.equal(config);
  });
});