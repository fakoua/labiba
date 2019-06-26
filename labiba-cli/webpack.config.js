const path = require('path');

module.exports = {
  entry: {
    lib: './src/cli.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        { test: /\.js$/, loader: "babel-loader" }
    ]
    }
};