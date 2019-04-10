const React = require('react');
const ReactResolver = require('react-resolver');

const components = require('@eymail/components');
const { Editor, builder } = require('@eymail/editor/lib/client');

require('./eyemail.config')({ components, builder });

const textarea = document.getElementById('textarea');

const appProps =
  typeof window.__EYEMAIL_APP_PROPS__ !== 'undefined'
    ? window.__EYEMAIL_APP_PROPS__
    : {};
appProps.code = textarea ? textarea.value : '';

ReactResolver.Resolver.render(() => {
  return React.createElement(Editor, appProps);
}, document.getElementById('app'));
