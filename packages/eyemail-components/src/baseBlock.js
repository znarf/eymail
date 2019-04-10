const _ = require('lodash');

const React = require('react');
const PropTypes = require('prop-types');

class BaseBlock extends React.Component {
  tableStyle() {
    const baseStyle = {};
    if (this.props.width.indexOf('%') === -1) {
      // We do that for Android Gmail App
      baseStyle.minWidth = `${this.props.width.replace('px', '')}px`;
    }
    return _.merge({}, baseStyle, this.props.outerStyle);
  }

  tableProps() {
    return {
      className: this.props.className,
      width: this.props.width,
      cellPadding: this.props.padding,
      cellSpacing: this.props.spacing,
      style: this.tableStyle(),
    };
  }

  tdStyle() {
    return _.merge({}, { textAlign: 'left' }, this.props.innerStyle);
  }

  tdProps() {
    return { style: this.tdStyle() };
  }

  render() {
    return (
      <table {...this.tableProps()}>
        <tbody>
          <tr>
            <td {...this.tdProps()}>{this.props.children}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

BaseBlock.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  padding: PropTypes.string,
  spacing: PropTypes.string,
  divStyle: PropTypes.object,
  outerStyle: PropTypes.object,
  innerStyle: PropTypes.object,
  children: PropTypes.node.isRequired,
};

BaseBlock.defaultProps = {
  width: '100%',
  padding: '0',
  spacing: '0',
  divStyle: {},
  outerStyle: {},
  innerStyle: {},
};

export default BaseBlock;
