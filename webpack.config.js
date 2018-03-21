const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const Autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
require("babel-polyfill");
module.exports = {
  mode: process.env.MODE,
  cache: true,
  plugins: [
    new CleanWebpackPlugin(["dist"]),
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
    new HardSourceWebpackPlugin()
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
        test: /\.(scss)$/,
        use: [{loader: "css-loader"},
          {
            loader: "postcss-loader", options:
            {
              ident: "postcss",
              plugins: () => [Autoprefixer()]
            }
          },
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          }, {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              precision: 8,
              data: "$ENV: " + "PRODUCTION" + ";"
            }
          }]
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