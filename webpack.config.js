const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');

module.exports = {
  entry: {
      vendor: Object.keys(package.dependencies),
      basicObservable:'./src/observable/basic-observable.ts',
      renderUtil:'./src/observable/render.ts',
      runner:'./src/observable/index.ts'
    },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js', '.tsx' ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        title: 'Rxjs menu',
        myPageHeader: 'Hello World',
        template: './index.html',
        filename: './dist/index.html' //relative to root of the application
    }),
    new HtmlWebpackPlugin({
        hash: true,
        title: 'Observable',
        myPageHeader: 'Observable example',
        template: './src/observable/index.html',
        chunks: ['vendor','basicObservable','renderUtil','runner'],
        filename: './dist/observable.html' 
    })
]
};