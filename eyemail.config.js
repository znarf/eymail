const stylesheet = require('./default.stylesheet');

module.exports = ({ builder, components }) => {
  // Register stylesheet
  components.stylesheet.set(stylesheet);
};
