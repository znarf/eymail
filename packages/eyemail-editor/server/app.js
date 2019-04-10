const path = require('path');

const express = require('express');

const hbs = require('hbs');

const bodyParser = require('body-parser');

const eyemail = require('./controller');

const app = express();

const router = express.Router();

// Load Template Engine
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../views/'));
app.engine('html', hbs.__express);

// Used in the Download endpoint
app.use(bodyParser.urlencoded({ extended: true }));

// Static Assets
app.use(express.static(path.join(__dirname, '../public/')));
app.use(
  '/codemirror',
  express.static(path.join(__dirname, '../node_modules/codemirror')),
);

// routing

router.route('/').get((req, res) => {
  eyemail.getTemplates(req, res);
});

router.route('/folders/:folder/template/:template').get((req, res) => {
  eyemail.getTemplate(req, res);
});

router
  .route('/folders/:folder/template/:template/edit')
  .get((req, res) => {
    eyemail.editTemplate(req, res);
  })
  .post((req, res) => {
    eyemail.saveTemplate(req, res);
  });

router.route('/folders/:folder').get((req, res) => {
  eyemail.getFolder(req, res);
});

router.route('/template/:template').get((req, res) => {
  eyemail.getTemplate(req, res);
});

router
  .route('/template/:template/edit')
  .get((req, res) => {
    eyemail.editTemplate(req, res);
  })
  .post((req, res) => {
    eyemail.saveTemplate(req, res);
  });

router.route('/download').post((req, res) => {
  eyemail.downloadTemplate(req, res);
});

app.use('/', router);

module.exports = app;
