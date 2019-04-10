const _ = require('lodash');

const React = require('react');
const ReactResolver = require('react-resolver');
const ReactDomServer = require('react-dom/server');

const html = require('html');

const components = require('@eymail/components');

const Layout = require('./layout');

const additionalComponents = {};

const registerAdditionalComponents = function(namespace, components) {
  additionalComponents[namespace] = components;
};

const buildComponent = function(jsx) {
  // all supported components should be included there
  // we use it in an eval call, so we're disabling eslint

  /* eslint-disable no-unused-vars */

  const Container = components.container;
  /* Container is boring, why not name it EyeMail? :-) */
  const EyeMail = Container;

  const Block = components.block;
  /* Names used before we had namespaces */
  const { Content, Bubble } = Block;

  const Image = components.image;
  /* Names used before we had namespaces */
  const { Single: SingleImage, FullSize: FullSizeImage } = Image;

  const Text = components.text;
  /* Names used before we had namespaces */
  const {
    Headline1: Headline1,
    Headline2: Headline2,
    Headline3: Headline3,
    Paragraph: Copy,
    Link: Link,
  } = Text;
  /* Shortcuts */
  const {
    Headline1: H1,
    Headline2: H2,
    Headline3: H3,
    Paragraph: P,
    Link: A,
  } = Text;

  const Divider = components.divider;
  /* Names used before we had namespaces */
  const { Simple: SimpleDivider, Line: LineDivider } = Divider;
  /* Shortcuts */
  const { Line } = Divider;

  const Section = components.section;
  const Legend = components.legend;
  const Cta = components.cta;
  const Button = components.button;

  for (const namespace in additionalComponents) {
    const _global = typeof window !== 'undefined' ? window : global;
    // global is bad but we haven't found better
    _global[namespace] = additionalComponents[namespace];
  }

  /* eslint-enable no-unused-vars */

  let babel, presets;
  if (process.env.IS_CLIENT) {
    babel = require('@babel/standalone');
    presets = ['react'];
  } else {
    babel = require('@babel/core');
    presets = ['@babel/preset-react'];
  }

  const result = babel.transform(jsx, { presets });
  if (result.code) {
    // eval is bad but we now what we're doing
    const Template = eval(result.code);
    if (Template) {
      return Template;
    }
  }
};

const buildHtmlAsync = function(templateJsx, callback, options) {
  const template = buildComponent(templateJsx);
  ReactResolver.Resolver.resolve(() => {
    return React.createElement(Layout, options, template);
  })
    .then(result => {
      const ResolvedElement = React.createElement(result.Resolved);
      let markup = ReactDomServer.renderToStaticMarkup(ResolvedElement);
      markup = markup.replace(/\[\[/g, '{{');
      markup = markup.replace(/\]\]/g, '}}');
      markup = html.prettyPrint(markup, { indent_size: 2 });
      callback(markup);
    })
    .catch(error => {
      console.log(error);
    });
};

const replaceVariables = function(string, character) {
  const variables = {
    firstName: 'Pedro',
    amount: '20.15',
    photoId: '72924172',
    thumbUrl:
      'https://cdn.eyeem.com/thumb/w/720/58fdaa8dcd61164044175457a2d509b94a9abf96-1442596777',
  };
  _.each(variables, (value, key) => {
    let regexp;
    if (character === '{') {
      regexp = `\\{\\{${key}\\}\\}`;
    } else {
      regexp = `\\[\\[${key}\\]\\]`;
    }
    string = string.replace(new RegExp(regexp, 'g'), value);
  });
  return string;
};

module.exports = {
  registerAdditionalComponents,
  buildComponent,
  buildHtmlAsync,
  replaceVariables,
};
