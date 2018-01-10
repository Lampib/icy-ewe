let setTitle     = require('./routing/_set-title');
let setCompanies = require('./routing/_set-companies');
let setCountries = require('./routing/_set-countries');
let setPeople    = require('./routing/_set-people');
let redirectTo   = require('./routing/_redirect-to');

let addJsonHeaders = require('./routing/_add-headers--json');

let insertPerson  = require('./routing/_db-insert--person');
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
    setPeople,
    setCompanies,
    renderIndex);

  app.get('/icy-ewe',
    setTitle('I see you'),
    renderChat);

  app.get('/test-add',
    setTitle('Test add'),
    setCountries,
    setCompanies,
    renderTestAdd);

  app.post('/add-user',
    setTitle('Know me'),
    insertPerson,
    redirectTo('/test-add'));

  app.post('/add-company',
    setTitle('Know me'),
    insertCompany,
    redirectTo('/test-add'));
}
