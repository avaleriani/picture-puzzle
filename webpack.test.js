const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
require("babel-polyfill");

module.exports = {
  mode: "development",
  cache: true,
  performance: {
    maxEntrypointSize: 8000000,
    maxAssetSize: 8000000
  },
  plugins: [
    new Webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: "PicturePuzzle",
      hash: true,
      template: "./index.html"
    }),
    new Webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ],
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "js/bundle.js",
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          "css-loader?sourceMap=true",
          "postcss-loader?sourceMap=true",
          "resolve-url-loader",
          "sass-loader?sourceMap=true"
        ]
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.(png|svg|jp?g|gif)$/,
        use: [
          "file-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          "file-loader"
        ]
      }
    ]
  }
};