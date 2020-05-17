const Dotenv = require('dotenv-webpack')

module.exports = {
  module: {
    rules: [{
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader', {
        loader: 'style-resources-loader',
        options: {
          patterns: [
            './path/from/context/to/scss/variables/*.scss',
          ]
        }
      }]
    }]
  },
  plugins: [
    new Dotenv()
  ]
}
