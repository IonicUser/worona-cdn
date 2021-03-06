/* eslint-disable */
var webpack = require('webpack');

module.exports = {
  entry: {
    server: [
      './src/server.js',
    ],
  },

  externals: [
    /^[a-z\-0-9]+$/,  // Every non-relative module is external
  ],

  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { cacheDirectory: true },
        test: /\.js$/,
      },
      {
        exclude: /node_modules/,
        loader: 'json-loader',
        test: /\.json$/,
      },
    ],
  },

  node: {
    __filename: true,
    __dirname: true,
  },

  output: {
    chunkFilename: '[id].[hash:5]-[chunkhash:7].js',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: './dist',
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],

  target: 'async-node',
};
