module.exports = {
    entry: './src/app.js',
    devtool: 'inline-source-map',
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      }]
    },
    // devServer: {
    //     port: 9001,
    //     open: true,
    //     openPage: "src/index.html",
    //     watchContentBase: true
    //   }
  }
  