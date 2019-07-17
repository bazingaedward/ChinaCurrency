const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const es5Config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'FormatRmb',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
  ]
};

const es6Config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.es6.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'FormatRmb',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {from: 'src/index.d.ts', to: './'}
    ])
  ]
};

module.exports = [es6Config, es5Config];