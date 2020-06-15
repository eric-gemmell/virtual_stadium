const path = require('path');

module.exports = {
  mode: 'development',
//  mode: "production",
  devtool: 'inline-source-map',
  entry:{
    eventCreator:'./src/eventCreatorIndex.js',
    seatSelector:"./src/seatSelectorIndex.js",
  },
  output: {
    filename: '[name].bundle.js',
    publicPath:'./public/',
    path: path.resolve(__dirname, './public')
  },
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, 
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
	use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  }
};
