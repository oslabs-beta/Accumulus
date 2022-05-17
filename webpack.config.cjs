const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({ template: '/src/index.html' })],
  devServer: {
    host: '0.0.0.0',
    port: 8080,

    static: {
      directory: path.resolve(__dirname, '/src'),
      publicPath: '/',
    },
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api/*': 'http://localhost:3000',
      secure: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.s?[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   use: 'ts-loader',
      // },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
