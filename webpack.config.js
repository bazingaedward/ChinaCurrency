const path = require('path');

const es5Config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'format-rmb',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};

const es6Config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.es6.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'format-rmb',
    libraryTarget: 'commonjs2'
  },
};

module.exports = [es5Config, es6Config];