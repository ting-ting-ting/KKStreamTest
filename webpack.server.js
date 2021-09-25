const path = require("path");
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const webpackNodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: "node",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin( {
      filename: 'index.html',
      template: path.resolve( __dirname, 'src/index.html'),
      minify: false,
   }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  externals: [webpackNodeExternals()],
};