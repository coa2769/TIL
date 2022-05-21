import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  name: 'sleact',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'hidden-source-map' : 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
      '@Assets': path.resolve(__dirname, 'Assets'),
    },
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chrome versions'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          env: {
            development: {
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test:/\.(png|svg|gif)$/,
        use: [
          {
            loader : 'file-loader',
            options: {
              name: 'images/[name].[ext]?[hash]',
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // eslint: {
      //   files: "./src/**/*",
      // },
    }),
    new webpack.EnvironmentPlugin({ 
      NODE_ENV: isDevelopment ? 'development' : 'production',
      FRONTEND_PORT : 3090,
      BACKEND_PORT : 8080,
      DEV_SERVER_URL : 'http://localhost',
      PROD_SERVER_URL : 'https://sleact.nodebird.com',
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  devServer: {
    historyApiFallback: true,
    hot : true,
    port: 3090, //FRONTEND_PORT이다.
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },

    proxy : {
      // '/api/': {
      //   target: 'http://localhost:3095',
      //   changeOrigin: true,
      //   ws: true,
      // },
      // '/oauth2/' : {
      //   target : 'http://localhost:8080', //소셜 로그인을 위해 준비된 서버 URL
      //   changeOrigin : true,
      //   ws : true,
      // }
    }
    // hot : false,
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin({
    overlay: {
      useURLPolyfill: true
    }
  }));
}
if (!isDevelopment && config.plugins) {
}

export default config;
