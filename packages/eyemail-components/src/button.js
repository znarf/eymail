const React = require('react');
const PropTypes = require('prop-types');

const BaseBlock = require('./baseBlock');

const Link = require('./text/link');

const Stylesheet = require('./stylesheet');

class Button extends React.Component {
  outerStyle() {
    const styles = Stylesheet.get();
    return {
      backgroundColor: this.props.backgroundColor || styles.colors.black,
      borderRadius: styles.borderRadius,
      border: this.props.border,
    };
  }

  innerStyle() {
    const styles = Stylesheet.get();
    return {
      fontFamily: styles.fontFamily,
      color: this.props.color || styles.colors.white,
      fontSize: styles.fontSize,
      fontWeight: '500',
      textAlign: 'center',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      padding: this.props.padding,
    };
  }

  render() {
    return (
      <BaseBlock outerStyle={this.outerStyle()} innerStyle={this.innerStyle()}>
        {this.props.href && (
          <Link
            style={{ color: this.props.color, textDecoration: 'none' }}
            href={this.props.href}
          >
            {this.props.children}
          </Link>
        )}
        {!this.props.href && this.props.children}
      </BaseBlock>
    );
  }
}

Button.propTypes = {
  href: PropTypes.string,
  padding: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  padding: '12px',
};

module.exports = Button;
