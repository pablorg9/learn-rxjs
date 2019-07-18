const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');

module.exports = {
  entry: {
      vendor: Object.keys(package.dependencies),
      basicOperators:'./src/basic-operators/basic-operators.ts',
      indexOperators:'./src/basic-operators/index.ts',
      indexObservable:'./src/basic-observable/index.ts',
      basicObservable:'./src/basic-observable/basic-observable.ts',
      renderUtil:'./src/common/render.ts'
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
        template: './src/basic-observable/index.html',
        chunks: ['vendor','basicObservable','renderUtil','indexObservable'],
        filename: './dist/basic-observable.html' 
    }),
    new HtmlWebpackPlugin({
        hash: true,
        title: 'Basic operators',
        myPageHeader: 'Basic operators',
        template: './src/basic-operators/index.html',
        chunks: ['vendor','basicOperators','renderUtil','indexOperators'],
        filename: './dist/basic-operators.html' 
    })
]
};