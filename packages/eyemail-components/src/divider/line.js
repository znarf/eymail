const React = require('react');
const PropTypes = require('prop-types');

const BaseBlock = require('../baseBlock');

class LineDivider extends React.Component {
  style() {
    const halfPadding = Math.round(this.props.height / 2);
    return {
      paddingTop: halfPadding,
      paddingBottom: halfPadding,
    };
  }

  borderStyle() {
    return {
      fontSize: '0',
      lineHeight: '0',
      borderTop: '1px solid #e5e5e5',
    };
  }

  render() {
    return (
      // Don't listen to the linter, &nbsp; is not empty
      <BaseBlock innerStyle={this.style()}>
        <BaseBlock outerStyle={this.borderStyle()}>&nbsp;</BaseBlock>
      </BaseBlock>
    );
  }
}

LineDivider.propTypes = {
  height: PropTypes.number,
};

LineDivider.defaultProps = {
  height: 32,
};

export default LineDivider;
