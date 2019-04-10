const React = require('react');

const Content = require('./content');
const FullSizeImage = require('../image/fullSize');

const Stylesheet = require('../stylesheet');

class Image extends React.Component {
  render() {
    const styles = Stylesheet.get();
    return (
      <Content padding="0">
        <FullSizeImage
          imgStyle={{ borderRadius: styles.borderRadius }}
          {...this.props}
        />
      </Content>
    );
  }
}

export default Image;
