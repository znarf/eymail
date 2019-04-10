const _ = require('lodash');

const React = require('react');
const PropTypes = require('prop-types');

const Stylesheet = require('../stylesheet');

class SingleImage extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    imgStyle: PropTypes.object,
  };

  static defaultProps = {
    alt: '',
    className: 'singleImage',
    imgStyle: {},
  };

  imgStyle() {
    const baseStyle = { display: 'block' };
    return _.merge({}, baseStyle, this.props.imgStyle);
  }

  imgClassname() {
    return 'singleImage';
  }

  imgProps() {
    const styles = Stylesheet.get();
    return {
      style: this.imgStyle(),
      className: this.props.className,
      width: this.props.width || styles.imageWidth,
      height: this.props.height,
      alt: this.props.alt,
      src: this.props.src,
    };
  }

  render() {
    return <img {...this.imgProps()} />;
  }
}

export default SingleImage;
