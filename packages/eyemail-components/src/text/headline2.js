const React = require('react');
const PropTypes = require('prop-types');

const Stylesheet = require('../stylesheet');

class Headline2 extends React.Component {
  render() {
    const styles = Stylesheet.get();
    return (
      <div className="headline2" style={styles.headline2}>
        {this.props.children}
      </div>
    );
  }
}

Headline2.propTypes = {
  children: PropTypes.node.isRequired,
};

module.exports = Headline2;
