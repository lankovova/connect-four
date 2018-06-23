const path = require('path');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    port: 9000,
  },
};
