const _ = require('lodash');

const React = require('react');
const PropTypes = require('prop-types');

const Stylesheet = require('../stylesheet');

class Paragraph extends React.Component {
  style() {
    const styles = Stylesheet.get();
    return _.merge({}, styles.copy, this.props.style);
  }

  render() {
    return <div style={this.style()}>{this.props.children}</div>;
  }
}

Paragraph.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

Paragraph.defaultProps = {
  style: {},
};

export default Paragraph;
