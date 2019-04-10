const React = require('react');
const PropTypes = require('prop-types');

const Stylesheet = require('../stylesheet');

class Headline1 extends React.Component {
  render() {
    const styles = Stylesheet.get();
    return (
      <div className="headline1" style={styles.headline1}>
        {this.props.children}
      </div>
    );
  }
}

Headline1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Headline1;
