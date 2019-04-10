const fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const fontSize = '14px';
const headlineFontSize = '21px';

const colors = {
  white: '#ffffff',
  black: '#000000',
  darkGrey: '#333333',
  lightGrey: '#666666',
  orange: '#ffaa33',
};

const stylesheet = {
  fontFamily,
  fontSize,
  headlineFontSize,

  colors,

  maxWidth: '600',
  textWidth: '400',
  imageWidth: '360', // 400 (textWidth) - 20 (paddingLeft) - 20 (paddingRight)

  borderRadius: '2px',

  backgroundColor: '#000000',
};

stylesheet.headline1 = {
  fontFamily: fontFamily,
  color: colors.white,
  fontSize: headlineFontSize,
  lineHeight: '28px',
  fontWeight: 'bold',
};

stylesheet.headline2 = {
  fontFamily: fontFamily,
  color: colors.white,
  fontSize: headlineFontSize,
  lineHeight: '28px',
  fontWeight: 'light',
};

stylesheet.headline3 = {
  fontFamily: fontFamily,
  color: colors.white,
  fontSize: fontSize,
  fontWeight: 'bold',
  lineHeight: '24px',
};

stylesheet.copy = {
  fontFamily: fontFamily,
  color: colors.white,
  fontSize: fontSize,
  lineHeight: '24px',
  fontWeight: 'light',
};

module.exports = stylesheet;
