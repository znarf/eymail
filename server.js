require('babel/register')({ stage: 0 });

const path = require('path');
const express = require('express');

const components = require('@eymail/components');

const { builder, file, app } = require('@eymail/editor/server');

require('./eyemail.config')({ components, builder });

// Register local directory
file.setTemplateDir(path.resolve(__dirname, 'templates'));

// Expose Webpack bundle
app.use(express.static(path.resolve(__dirname, 'build')));

const server = app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('EyeMail listening at http://%s:%s', host, port);
});
