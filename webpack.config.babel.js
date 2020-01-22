import path from 'path'

const config = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'markdown-it-drawio-viewer.js',
    libraryTarget: 'umd',
    library: 'MarkdownItDrawioViewer',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devtool: 'source-map'
}

export default config
