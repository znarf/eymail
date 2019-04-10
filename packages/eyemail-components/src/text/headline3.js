const React = require('react');
const PropTypes = require('prop-types');

const Stylesheet = require('../stylesheet');

class Headline3 extends React.Component {
  render() {
    const styles = Stylesheet.get();
    return (
      <div className="headline3" style={styles.headline3}>
        {this.props.children}
      </div>
    );
  }
}

Headline3.propTypes = {
  children: PropTypes.node.isRequired,
};

module.exports = Headline3;
