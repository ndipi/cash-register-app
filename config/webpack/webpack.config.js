const { generateWebpackConfig } = require('shakapacker')

const options = {
  resolve: {
      extensions: ['.css', '.ts', '.tsx']
  }
}

// This results in a new object copied from the mutable global
module.exports = generateWebpackConfig(options)