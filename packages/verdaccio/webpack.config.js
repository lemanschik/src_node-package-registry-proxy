/* eslint-disable max-len */
const path = require('path');
const webpack = require('webpack');
const { PinoWebpackPlugin } = require('pino-webpack-plugin');

module.exports = {
  entry: './src/start.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  externalsPresets: { node: true },
  devtool: 'nosources-source-map',
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^canvas$/,
    }),
    new webpack.BannerPlugin({
      entryOnly: true,
      banner: `#!/usr/bin/env node\n/* eslint-disable */`,
      raw: true,
    }),
    new PinoWebpackPlugin({ transports: ['@verdaccio/logger-prettify'] }),
  ],
  module: {
    rules: [
      // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.([cm]?ts)$/, loader: 'ts-loader' },
    ],
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      // jsdom -> canvas is not required for the purpose of backend
      canvas: false,
    },
  },
};
