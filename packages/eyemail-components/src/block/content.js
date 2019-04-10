const React = require('react');
const PropTypes = require('prop-types');

const BaseBlock = require('../baseBlock');
const CenteredBlock = require('../centeredBlock');

const Stylesheet = require('../stylesheet');

class Content extends React.Component {
  outerStyle() {
    const styles = Stylesheet.get();
    return {
      borderRadius: styles.borderRadius,
      backgroundColor: styles.colors.black,
    };
  }

  innerStyle() {
    return {
      paddingTop: this.props.padding,
      paddingBottom: this.props.padding,
    };
  }

  render() {
    const styles = Stylesheet.get();
    return (
      <BaseBlock innerStyle={{ paddingTop: '10px' }}>
        <CenteredBlock
          className="maxWidth"
          width={styles.maxWidth}
          outerStyle={this.outerStyle()}
          innerStyle={this.innerStyle()}
        >
          {this.props.children}
        </CenteredBlock>
      </BaseBlock>
    );
  }
}

Content.propTypes = {
  padding: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Content.defaultProps = {
  padding: '32px',
};

export default Content;
