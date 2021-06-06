const path = require("path");

module.exports = {
  mode: "development",

  entry: "./src/main.ts",

  module: {
    rules: [
      {
        test: /\.(js|ts)$/,

        use: "ts-loader",
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
  },
};
