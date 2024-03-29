/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => ({
  entry: path.join(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: env.NODE_ENV || 'production',
  devtool: 'source-map',
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      favicon: './src/assets/favicon.ico',
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.join(__dirname, 'src', 'assets', 'data'),
    //       to: path.join(__dirname, 'dist', 'assets'),
    //     },
    //   ],
    // }),
    new Dotenv({
      path: './.env'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {    
    historyApiFallback: true,
  },
});
