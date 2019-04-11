function set(styles) {
  const _global = typeof window !== 'undefined' ? window : global;
  _global.styles = styles;
}

function get() {
  const _global = typeof window !== 'undefined' ? window : global;
  return _global.styles || {};
}

module.exports = { get, set };
