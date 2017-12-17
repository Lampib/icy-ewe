let setTitle   = require('./routing/_set-title');
let redirectTo = require('./routing/_redirect-to');

let addJsonHeaders = require('./routing/_add-headers--json');

let insertUser    = require('./routing/_db-insert--user');
let insertCompany = require('./routing/_db-insert--company');

let renderIndex    = require('./routing/_render--index');
let renderChat     = require('./routing/_render--chat');
let renderTestAdd  = require('./routing/_render--test-add');

module.exports = {
  init,
};

function init(app) {
  app.get('/',
    setTitle(''),
    renderIndex);

  app.get('/icy-ewe',
    setTitle('I see you'),
    renderChat);

  app.get('/test-add',
    setTitle('Test add'),
    renderTestAdd)

  app.post('/add-user',
    setTitle('Know me'),
    insertUser,
    redirectTo('/test-add'));

  app.post('/add-company',
    setTitle('Know me'),
    insertCompany,
    redirectTo('/test-add'));
}
