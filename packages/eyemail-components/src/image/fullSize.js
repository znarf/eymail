const React = require('react');

const SingleImage = require('./single');

const Stylesheet = require('../stylesheet');

class FullSizeImage extends SingleImage {
  static defaultProps = SingleImage.defaultProps;

  imgProps() {
    const styles = Stylesheet.get();
    return {
      ...this.props,
      width: styles.maxWidth,
      className: 'fullSizeImage',
    };
  }

  render() {
    return <SingleImage {...this.imgProps()} />;
  }
}

export default FullSizeImage;
