const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = [
  {
    target: 'node',
    bail: true,
    entry: path.resolve(__dirname, 'src/server/server.js'),
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js']
    },
    externals: [
      {
        'mapbox-gl': '"mapbox-gl"'
      },
      // nodeExternals()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        }
      ]
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new ExtractTextPlugin('index.css'),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.EnvironmentPlugin(['MAPBOX_ACCESS_TOKEN'])
    ]
  },
  {
    bail: true,
    entry: path.resolve(__dirname, 'src/app/browser.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist/assets')
    },
    resolve: {
      extensions: ['.js']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('index.css'),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.EnvironmentPlugin(['MAPBOX_ACCESS_TOKEN'])
    ]
  }
];
