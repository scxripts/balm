module.exports = {
  entry: {
    'vendor-a': ['jquery'],
    'vendor-b': ['lodash'],
    'vendor-c': ['moment'],
    main: './src/scripts/vendor-page.js'
  },
  optimization: {
    splitChunks: {
      maxInitialRequests: 5
    }
  }
};
