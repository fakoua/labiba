const path = require('path');
const createLodashAliases = require('lodash-loader').createLodashAliases;

module.exports = {
  entry: {
    index: './src/main.js',
    transformer: './src/transformer/transformer.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        { test: /\.js$/, loader: "babel-loader!lodash-loader" }
    ]
    },
    resolve: {
        alias: createLodashAliases()
    }
};