const React = require('react');
const PropTypes = require('prop-types');

const BaseBlock = require('./baseBlock');

const Stylesheet = require('./stylesheet');

class Container extends React.Component {
  innerStyle() {
    const styles = Stylesheet.get();
    return {
      padding: '10px',
      backgroundColor: styles.backgroundColor,
    };
  }

  render() {
    return (
      <BaseBlock innerStyle={this.innerStyle()} classname="Container">
        {this.props.children}
      </BaseBlock>
    );
  }
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
