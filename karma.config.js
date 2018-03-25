const webpackConfig = require("./webpack.test.js");

module.exports = (config) => {
  config.set({
    basePath: "./test",
    frameworks: ["mocha", "chai", "sinon"],
    files: [
      "karma.setup.js",
      {pattern: "*.test.js", watched: false},
      {pattern: "./../static/images/*.jpg", watched: false, included: false, served: true}
    ],
    scssPreprocessor: {
      options: {
        sourceMap: true
      }
    },
    preprocessors: {
      "*.test.js": ["webpack", "sourcemap", "coverage"]
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      devtool: "inline-source-map",
      mode: webpackConfig.mode
    },
    htmlReporter: {
      outputFile: "../../test/logs/result.html",
      pageTitle: "Game",
      subPageTitle: "Unit tests",
      groupSuites: true,
      useCompactStyle: false,
      useLegacyStyle: false
    },
    mochaReporter: {
      showDiff: true
    },
    reporters: ["progress", "html"],
    port: 9876,
    colors: true,
    logLevel: config.ERROR,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    concurrency: Infinity,
    plugins: [
      require("karma-chrome-launcher"),
      require("karma-htmlfile-reporter"),
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-chai"),
      require("karma-sinon"),
      require("karma-sourcemap-loader"),
      require("karma-coverage")
    ]
  });
};