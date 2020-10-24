const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@components': './src/components',
    '@assets' : './src/assets',
    '@navigation' : './src/Navigation',
    '@pages' : './src/pages',
    '@screens' : './src/screens',
    '@utils' : './src/utils'
  })(config)

  return config
}