const React = require('react');
const ReactResolver = require('react-resolver');
const ReactDomServer = require('react-dom/server');

const html = require('html');

const components = require('@eymail/components');

const Layout = require('./layout');

const additionalComponents = {};

const registerStylesheet = function(stylesheet) {
  components.stylesheet.set(stylesheet);
};

const registerAdditionalComponents = function(namespace, components) {
  additionalComponents[namespace] = components;
};

const buildComponent = function(jsx, props = {}) {
  const _global = typeof window !== 'undefined' ? window : global;

  // all supported components should be included there
  // we use it in an eval call, so we're disabling eslint

  /* eslint-disable no-unused-vars */

  const {
    container: Container,
    block: Block,
    imange: Image,
    text: Text,
    divider: Divider,
    button: Button,
  } = components;

  const { Line } = Divider;
  const { Headline1, Headline2, Headline3, Paragraph, Link } = Text;

  const {
    Headline1: H1,
    Headline2: H2,
    Headline3: H3,
    Paragraph: P,
    Link: A,
  } = Text;

  const EyeMail = Container;
  const EyMail = Container;
  const Eymail = Container;

  // Make namespaced components available through global
  // (sorry, we haven't found better yet)
  for (const namespace in additionalComponents) {
    _global[namespace] = additionalComponents[namespace];
  }

  // Make style available to the container as global
  // (sorry, we haven't found better yet)
  if (props.style) {
    _global.style = props.style;
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

const buildHtmlAsync = function(templateJsx, props, callback) {
  const template = buildComponent(templateJsx, props);
  ReactResolver.Resolver.resolve(() => {
    return React.createElement(Layout, props, template);
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

module.exports = {
  registerStylesheet,
  registerAdditionalComponents,
  buildComponent,
  buildHtmlAsync,
};
