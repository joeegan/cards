module.exports = {
  context: `${__dirname}/src`,
  entry: './ui',
  devtool: 'source-map',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
