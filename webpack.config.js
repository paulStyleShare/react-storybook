const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({ NODE_ENV, APP_ENV = 'development' }) => {
  const isDevelopment = NODE_ENV === 'development';
  const isProduction = NODE_ENV === 'production';
  const supportedLocales = ['ko', 'en', 'ja'];
  const environments = require('dotenv').config({
    path: path.resolve(__dirname, `./.env.${APP_ENV}`),
  }).parsed;
  function getPublicPath() {
    return './';
    // const prefixes = ['https://web-frontend.styleshare.io'];
    // switch (appEnv) {
    //   case 'production':
    //     prefixes.push('prod');
    //     break;
    //   case 'canary':
    //     prefixes.push('canary');
    //     break;
    //   case 'stage':
    //     prefixes.push('stage');
    //     break;
    //   default:
    //     prefixes.push(appEnv);
    //     break;
    // }
    // return `${prefixes.join('/')}/`;
  }
  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    entry: './src/index.tsx',
    output: {
      path: isProduction ? path.resolve(__dirname, './dist') : undefined,
      pathinfo: isDevelopment,
      filename: isProduction ? '[name].[contenthash:8].js' : 'bundle.js',
      chunkFilename: isProduction ? '[id].[chunkhash:8].js' : '[id].js',
      publicPath: isProduction ? getPublicPath(APP_ENV) : '/',
      futureEmitAssets: true, // TODO: deprecate in v5
    },
    devServer: isDevelopment
      ? {
          contentBase: [path.resolve(__dirname, './public')],
          watchContentBase: true,
          historyApiFallback: true,
          hot: true,
          port: 8081,
          host: 'local.styleshare.kr',
        }
      : undefined,
    // Fail out on the first error instead of tolerating it on production.
    bail: isProduction,
    // devServer: {
    //   historyApiFallback: true,
    //   inline: true,
    //   port: 3000,
    //   hot: true,
    //   publicPath: '/',
    // },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          loader: 'eslint-loader',
          include: path.resolve(__dirname, './src'),
          exclude: /node_modules/,
          options: {
            configFile: path.resolve(
              __dirname,
              isProduction
                ? './.eslint/.eslintrc.prod.js'
                : './.eslint/.eslintrc.dev.js',
            ),
          },
        },
        {
          test: /\.(tsx?|jsx?)$/,
          loader: 'babel-loader',
          exclude: /node_modules\/(?!(scroll-js)\/).*/,
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(jpe?g|png|webp)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            publicPath: isProduction ? '' + 'assets/' : undefined,
            outputPath: 'assets/',
            name: isProduction
              ? '[name].[contenthash:8].[ext]'
              : '[name].[ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, './tsconfig.json'),
        }),
      ],
    },
    plugins: [
      // 빌드 할 때마다 dist 폴더 삭제
      new CleanWebpackPlugin(),
      isDevelopment &&
        new ForkTsCheckerWebpackPlugin({
          eslint: {
            files: [
              'src/**/*.{ts,tsx}',
              // '!src/**/*.spec.{ts,tsx}',
              // '!src/**/*.test.{ts,tsx}',
            ],
          },
        }),
      isDevelopment &&
        new StylelintPlugin({
          files: ['src/**/*.(j|t)s?(x)', '**/*.s?(a|c)ss'],
          fix: true,
          syntax: 'css-in-js',
        }),
      // 사용하는 언어만 포함
      new webpack.ContextReplacementPlugin(
        /date-fns[/\\]/,
        new RegExp(`[/\\\\](${supportedLocales.join('|')})[/\\\\]`),
      ),
      // https://github.com/StyleShare/web-frontend/pull/903
      isDevelopment &&
        new CircularDependencyPlugin({
          include: /src/,
          exclude: /node_modules/,
          failOnError: true,
        }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash:8].css',
          chunkFilename: '[id].[chunkhash:8].css',
        }),
      new HTMLWebpackPlugin({
        title: '스타일쉐어',
        template: path.resolve(__dirname, './src/templates/index.ejs'),
      }),
      new CopyPlugin({
        patterns: [{ from: 'public/assets', to: 'assets' }],
        options: {
          concurrency: 100,
        },
      }),
      new webpack.EnvironmentPlugin({
        ...environments,
        APP_ENV,
      }),
    ].filter(Boolean),
    optimization: isProduction
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                parse: {
                  ecma: 8,
                },
                compress: {
                  ecma: 5,
                  warnings: false,
                  comparisons: false,
                },
                mangle: {
                  safari10: true,
                },
                output: {
                  ecma: 5,
                  comments: false,
                  ascii_only: true,
                },
              },
              sourceMap: true,
              extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin({}),
          ],
          moduleIds: 'hashed',
          runtimeChunk: true,
          splitChunks: {
            chunks: 'all',
            name: false,
          },
        }
      : undefined,
  };
};
