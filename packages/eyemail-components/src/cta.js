const React = require('react');
const PropTypes = require('prop-types');

const Button = require('./button');

class Cta extends React.Component {
  render() {
    return <Button {...this.props} />;
  }
}

Cta.propTypes = {
  href: PropTypes.string,
  padding: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

Cta.defaultProps = {
  padding: '12px',
  color: '#ffffff',
  backgroundColor: 'transparent',
  border: '2px solid #ffffff',
};

export default Cta;
