const React = require('react');

const SingleImage = require('./single');

const Stylesheet = require('../stylesheet');

class FullSizeImage extends SingleImage {
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

FullSizeImage.defaultProps = SingleImage.defaultProps;

module.exports = FullSizeImage;
