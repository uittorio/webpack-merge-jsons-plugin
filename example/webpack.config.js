/*globals require, module */

var WebpackMergeJsonsPlugin = require("../index");

module.exports = {
  module: {
    rules: []
  },
  entry: {
    "main": "./index.js"
  },
  output: {
    filename: "[name].bundle.js"
  },
  plugins: [
    new WebpackMergeJsonsPlugin({
      src: './jsons/*.json',
      dest: 'merged.json'
    })
  ]
};
