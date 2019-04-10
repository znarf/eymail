const _ = require('lodash');

const React = require('react');
const PropTypes = require('prop-types');

const BaseBlock = require('./baseBlock');

class CenteredBlock extends React.Component {
  divStyle() {
    return _.merge({}, { textAlign: 'center' }, this.props.divStyle);
  }

  divProps() {
    return { style: this.divStyle() };
  }

  render() {
    return (
      <div {...this.divProps()}>
        <center>
          <BaseBlock {...this.props} />
        </center>
      </div>
    );
  }
}

CenteredBlock.propTypes = {
  width: PropTypes.string.isRequired,
  className: PropTypes.string,
  divStyle: PropTypes.object,
  outerStyle: PropTypes.object,
  innerStyle: PropTypes.object,
};

CenteredBlock.defaultProps = {
  divStyle: {},
  outerStyle: {},
  innerStyle: {},
};

export default CenteredBlock;
