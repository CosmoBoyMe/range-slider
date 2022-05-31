/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode,
  target: 'web',

  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, './src'),
    open: true,
    compress: true,
    port: 8080,
  },

  entry: {
    main: path.resolve(__dirname, './src/demo/index.ts'),
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'script/[name].bundle.js',
    clean: true,
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  devtool: 'source-map',

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash].css',
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/demo/index.pug'), // шаблон
    }),

    new CopyPlugin({
      patterns: [
        {
          from: 'assets/favicons',
          to: 'assets/favicons',
        },
      ],
    }),
  ],

  module: {
    rules: [
      // typescript

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
      },

      // стили

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },

      // изображения

      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext][query]',
        },
      },

      // шрифты

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
      // pug

      {
        test: /\.pug$/,
        exclude: /(node_modules|bower_components)/,
        use: ['pug-loader'],
      },
    ],
  },
};
