const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }]
      },
    plugins: [
        new MonacoWebpackPlugin()
      ]
  };