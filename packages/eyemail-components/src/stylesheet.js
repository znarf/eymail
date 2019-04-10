let styles = {};

function set(_styles) {
  styles = _styles;
}

function get() {
  return styles;
}

module.exports = { get, set };
