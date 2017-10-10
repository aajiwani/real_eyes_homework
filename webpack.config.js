const path = require("path");

var config = {
  entry: "./main.js",

  output: {
    path: __dirname,
    filename: "index.js"
  },

  devServer: {
    inline: true,
    port: 8080
  },

  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve("src"), path.resolve(__dirname, "node_modules")]
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",

        query: {}
      }
    ]
  }
};

module.exports = config;
