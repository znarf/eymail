const React = require('react');
const PropTypes = require('prop-types');

class Layout extends React.Component {
  render() {
    return this.props.children;
  }
}

Layout.propTypes = {
  title: PropTypes.string,
  style: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  title: 'Eymail Template',
};

module.exports = Layout;
