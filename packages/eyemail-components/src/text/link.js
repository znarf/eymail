const _ = require('lodash');

const React = require('react');
const PropTypes = require('prop-types');

const Stylesheet = require('../stylesheet');

class Link extends React.Component {
  href() {
    return this.props.href;
  }

  style() {
    const styles = Stylesheet.get();
    return _.merge({}, styles.link, this.props.style);
  }

  render() {
    return (
      <a href={this.href()} style={this.style()}>
        {this.props.children}
      </a>
    );
  }
}

Link.propTypes = {
  style: PropTypes.object,
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
