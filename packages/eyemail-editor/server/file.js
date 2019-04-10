const fs = require('fs');
const path = require('path');

const file = {};

let templateDir;

file.setTemplateDir = function(dir) {
  templateDir = dir;
};

file.getTemplates = function(query, folder, callback) {
  let dir = templateDir;
  if (folder) {
    dir = `${dir}/${folder}`;
  }

  fs.readdir(dir, (err, files) => {
    const payload = {};

    payload.folders = files.filter(file =>
      fs.statSync(`${dir}/${file}`).isDirectory(),
    );

    payload.templates = files
      .filter(file => !fs.statSync(`${dir}/${file}`).isDirectory())
      .map(file => file.replace('.tpl', ''));

    callback(payload);
  });
};

file.getTemplate = function(template, folder, callback) {
  let dir = templateDir;
  if (folder) {
    dir = `${dir}/${folder}`;
  }

  fs.readFile(
    path.resolve(`${dir}/${template}.tpl`),
    'utf8',
    (err, templateJsx) => {
      callback(templateJsx);
    },
  );
};

// eslint-disable-next-line
file.commitTemplate = function(template, folder, params, callback) {
  console.log('Not implemented.');
};

module.exports = file;
