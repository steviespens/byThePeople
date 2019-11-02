var webpack = require('webpack');
var path = require('path');
var sinon = require('sinon');
var APP_DIR = path.resolve(__dirname, './project/frontend/src');
var BUILD_DIR = path.resolve(__dirname, './project/frontend/static/frontend');
module.exports = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'main.js'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
