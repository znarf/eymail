const React = require('react');
const PropTypes = require('prop-types');

const BaseBlock = require('../baseBlock');

class SimpleDivider extends React.Component {
  style() {
    const halfPadding = Math.round(this.props.height / 2);
    return {
      fontSize: '0',
      lineHeight: '0',
      paddingTop: `${halfPadding}px`,
      paddingBottom: `${halfPadding}px`,
    };
  }

  render() {
    return (
      // Don't listen to the linter, &nbsp; is not empty
      <BaseBlock innerStyle={this.style()}>&nbsp;</BaseBlock>
    );
  }
}

SimpleDivider.propTypes = {
  height: PropTypes.number,
};

SimpleDivider.defaultProps = {
  height: 20,
};

module.exports = SimpleDivider;
