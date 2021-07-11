const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const config = {
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
module.exports = (env, argv) => {
  console.log(argv);
  if (argv.mode !== 'production') {
    config.target = 'web';
  }
  if (argv.analyze) {
    config.plugins.push(new BundleAnalyzerPlugin());
    config.plugins.push(
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: {
          quality: '65-80',
        },
        gifsicle: {
          interlaced: false,
          optimizationLevel: 1,
          colors: 256,
        },
        svgo: {},
        pngquant: {
          quality: '70-85',
        },
      })
    );
  }
  return config;
};
