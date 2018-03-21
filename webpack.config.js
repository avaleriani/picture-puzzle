const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
require("babel-polyfill");
module.exports = {
  mode: process.env.MODE,
  cache: true,
  plugins: [
    new CleanWebpackPlugin(["public"]),
    new Webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: "MediaMonks",
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
      path: __dirname + "/public/css",
      chunkFilename: "[id].css"
    })
  ],
  entry: ["babel-polyfill", "./src/js/index.js"],
  output: {
    path: path.join(__dirname, "./public"),
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