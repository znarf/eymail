const React = require('react');
const PropTypes = require('prop-types');

class Layout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{this.props.title}</title>
          <style type="text/css">{this.props.style}</style>
        </head>
        <body>{this.props.children}</body>
      </html>
    );
  }
}

Layout.propTypes = {
  title: PropTypes.string,
  style: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  title: 'EyeEm Email',
};

module.exports = Layout;
