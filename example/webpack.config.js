/*globals require, module */
const WebpackMergeJsonsPlugin = require("../index");

module.exports = {
  mode: "development",
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
