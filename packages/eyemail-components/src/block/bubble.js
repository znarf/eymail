const React = require('react');
const PropTypes = require('prop-types');

const BaseBlock = require('../baseBlock');
const CenteredBlock = require('../centeredBlock');

const Stylesheet = require('../stylesheet');

class Bubble extends React.Component {
  innerStyle() {
    return {
      padding: '0 0 16px 0',
    };
  }

  pointerStyle() {
    return {
      borderTop: '15px solid #FFFFFF',
      borderRight: '15px solid transparent',
      borderBottom: '0 solid transparent',
      borderLeft: '15px solid transparent',
      width: 0,
    };
  }

  render() {
    const styles = Stylesheet.get();
    return (
      <CenteredBlock
        width={styles.textWidth}
        class="textWidth"
        innerStyle={this.innerStyle()}
      >
        <BaseBlock innerStyle={{ paddingLeft: '20px', paddingBottom: '20px' }}>
          <div style={this.pointerStyle()} />
        </BaseBlock>
        {this.props.children}
      </CenteredBlock>
    );
  }
}

Bubble.propTypes = {
  children: PropTypes.node.isRequired,
};

module.exports = Bubble;
