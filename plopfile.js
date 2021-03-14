const generateComponent = require('./generate/icon')

module.exports = function (plop) {
  plop.setHelper('obj', (text) => `{{ ${text} }}`)
  plop.setHelper('propsHelper', (text) => `{${text}}`)
  plop.setGenerator('icon', generateIcon)
}
