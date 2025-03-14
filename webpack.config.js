const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const BASE_JS = './src/client/js/'

module.exports = {
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
  ],
  entry: {
    main: BASE_JS + 'main.js',
    videoPlayer: BASE_JS + 'videoPlayer.js',
    videoRecorder: BASE_JS + 'videoRecorder.js',
    commentSection: BASE_JS + 'commentSection.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'assets'),
    clean: true,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
}
