module.exports = {
  context: __dirname,
  entry: './client',
  output: {
    filename: 'webpack-bundle.js',
    path: './build',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { stage: 0 },
      },
    ],
  },
};
