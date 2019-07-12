const path = require('path');

 const nodeConfig = {
  mode: 'production',
  target: 'node',
  entry: './src/index.js',
  output: {
    filename: 'index.node.js',
    path: path.resolve(__dirname, 'dist')
  }
};

const browserConfig = {
  mode: 'production',
  target: 'web',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = [browserConfig, nodeConfig];