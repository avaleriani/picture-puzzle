const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const mode = process.env.MODE ? process.env.MODE : "production";
require("babel-polyfill");

module.exports = {
  mode: mode,
  cache: true,
  performance: {
    maxEntrypointSize: 2000000,
    maxAssetSize: 2000000
  },
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "js/bundle.js"
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
          MiniCssExtractPlugin.loader,
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
          loader: "babel-loader"
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
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new Webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: "Picture Puzzle",
      hash: true,
      template: "./index.html"
    }),
    new Webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new Webpack.DefinePlugin({
      "CANVAS_RENDERER": JSON.stringify(true),
      "WEBGL_RENDERER": JSON.stringify(true)
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      path: __dirname + "/dist/css",
      chunkFilename: "[id].css"
    })
  ]
};