const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/main.ts',

  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,

        use: 'ts-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/html/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'assets',
          to: 'static',
        },
      ],
    }),
  ],
  target: ['web', 'es5'],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
  },
};
