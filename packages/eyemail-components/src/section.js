const React = require('react');
const PropTypes = require('prop-types');

const CenteredBlock = require('./centeredBlock');

const Stylesheet = require('./stylesheet');

class Section extends React.Component {
  innerStyle() {
    return {
      padding: '0 20px',
    };
  }

  render() {
    const styles = Stylesheet.get();
    return (
      <CenteredBlock
        className="textWidth"
        width={styles.textWidth}
        innerStyle={this.innerStyle()}
      >
        {this.props.children}
      </CenteredBlock>
    );
  }
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

module.exports = Section;
