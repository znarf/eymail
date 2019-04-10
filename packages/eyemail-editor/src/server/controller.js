const fs = require('fs');

const path = require('path');

const React = require('react');
const ReactResolver = require('react-resolver');
const ReactDomServer = require('react-dom/server');

const Editor = require('../editor');

const File = require('./file');

const buildHtmlWithCss = function(templateJsx, callback) {
  const builder = require('@eymail/builder');
  const templateCss = fs
    .readFileSync(path.join(__dirname, '../style.css'))
    .toString();
  builder.buildHtmlAsync(templateJsx, callback, { style: templateCss });
};

const replaceVariables = function(html) {
  const builder = require('@eymail/builder');
  return builder.replaceVariables(html, '{');
};

const eyemail = {
  getTemplates: function(req, res) {
    File.getTemplates(req.query, null, payload => {
      const appProps = {
        browse: true,
        authoring: false,
        templates: payload.templates,
        folders: payload.folders,
      };
      const markup = ReactDomServer.renderToString(
        React.createElement(Editor, appProps),
      );
      res.render('index', {
        markup: markup,
        data: JSON.stringify({}),
        appProps: JSON.stringify(appProps),
        class: 'list',
      });
    });
  },

  getTemplate: function(req, res) {
    const template = req.params.template;

    const folder = req.params.folder;
    const isDirtyTemplateString = /[[\]{}]+/.test(template);
    if (!isDirtyTemplateString) {
      File.getTemplate(template, folder, templateJsx => {
        buildHtmlWithCss(templateJsx, markup => {
          res.send(replaceVariables(markup));
        });
      });
    } else {
      res.send();
    }
  },

  getFolder: function(req, res) {
    File.getTemplates(req.query, req.params.folder, payload => {
      const appProps = {
        browse: true,
        authoring: false,
        templates: payload.templates,
        folder: req.params.folder,
      };
      const markup = ReactDomServer.renderToString(
        React.createElement(Editor, appProps),
      );
      res.render('index', {
        markup: markup,
        data: JSON.stringify({}),
        appProps: JSON.stringify(appProps),
        class: 'list',
      });
    });
  },

  editTemplate: function(req, res) {
    const appProps = { browse: false, authoring: true };
    const template = req.params.template;
    const folder = req.params.folder;
    File.getTemplate(template, folder, templateJsx => {
      appProps.code = templateJsx;
      ReactResolver.Resolver.resolve(() => {
        return React.createElement(Editor, appProps);
      })
        .then(result => {
          const ResolvedElement = React.createElement(result.Resolved);
          const markup = ReactDomServer.renderToString(ResolvedElement);
          res.render('index', {
            markup: markup,
            data: JSON.stringify(result.data),
            appProps: JSON.stringify(appProps),
            class: 'dual-pane',
          });
        })
        .catch(error => {
          console.log(error);
          return res.status(500).send(error);
        });
    });
  },

  saveTemplate: function(req, res) {
    const template = req.params.template;
    const message = req.body.message;
    const templateJsx = req.body.templateJsx;
    const folder = req.params.folder;

    File.getTemplate(template, folder, (content, sha) => {
      const params = {
        sha: sha,
        message: message,
        content: templateJsx,
      };
      File.commitTemplate(template, folder, params, () => {
        return res.send('Ok');
      });
    });
  },

  downloadTemplate: function(req, res) {
    buildHtmlWithCss(req.body.templateJsx, html => {
      res.attachment('template.html');
      res.send(html);
    });
  },
};

module.exports = eyemail;
