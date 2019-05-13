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
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{this.props.title}</title>
          <style type="text/css">{this.props.style || global.style}</style>
        </head>
        <body>
          <BaseBlock innerStyle={this.innerStyle()} classname="Container">
            {this.props.children}
          </BaseBlock>
        </body>
      </html>
    );
  }
}

Container.propTypes = {
  title: PropTypes.string,
  style: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Container.defaultProps = {
  title: 'Eymail Template',
};

module.exports = Container;
