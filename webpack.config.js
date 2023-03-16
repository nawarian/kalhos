const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');

const htmlPluginCfg = new htmlPlugin({
  template: path.resolve(__dirname, 'index.html'),
  filename: 'index.html',
  inject: 'body',
});

const copyPluginCfg = new copyPlugin({
  patterns: [
    { from: 'assets/*.png', to: 'assets/[name].png' },
    { from: 'maps/*.json', to: 'maps/[name].json' },
  ],
});

module.exports = {
  entry: './src/game.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader',
      },
      {
        test: require.resolve('phaser'),
        loader: 'expose-loader',
        options: {
          exposes: {
            globalName: 'Phaser',
            override: true,
          },
        },
      },
    ],
  },
  plugins: [htmlPluginCfg, copyPluginCfg],
  devServer: {
    static: path.resolve(__dirname, './dist'),
    host: '0.0.0.0',
    port: 8080,
    open: false,
    hot: true,
    watchFiles: ['src/**/*.ts', 'index.html'],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
