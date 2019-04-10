const stylesheet = require('./default.stylesheet');

module.exports = ({ builder }) => {
  builder.registerStylesheet(stylesheet);
};
