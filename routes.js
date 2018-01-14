let passport = require('./config/passport');

let setTitle       = require('./routing/_set-title');
let setCompanies   = require('./routing/_set-companies');
let setCountries   = require('./routing/_set-countries');
let setPeople      = require('./routing/_set-people');
let setUser        = require('./routing/_set-user');
let setRedirectURL = require('./routing/_set-redirect-url');
let redirectTo     = require('./routing/_redirect-to');
let logOut         = require('./routing/_log-out');
let done           = require('./routing/_close-connection');

let addJsonHeaders = require('./routing/_add-headers--json');

let insertPerson  = require('./routing/_db-insert--person');
let insertCompany = require('./routing/_db-insert--company');

let renderIndex    = require('./routing/_render--index');
let renderChat     = require('./routing/_render--chat');
let renderTestAdd  = require('./routing/_render--add-data');
let renderLogIn    = require('./routing/_render--log-in');

module.exports = {
  init,
};

function init(app) {
  app.get('/',
    setTitle(''),
    setUser,
    setPeople,
    setCompanies,
    renderIndex,
    done);

  app.get('/log-out',
    logOut,
    redirectTo('/'),
    done);

  app.get('/log-in',
    setTitle('Log in'),
    setRedirectURL,
    renderLogIn,
    done);

  app.post('/log-in',
    passport.authenticate('local-login', { failureRedirect: '/log-in' }),
    redirectTo('/'),
    done);

  app.get('/icy-ewe',
    setTitle('I see you'),
    setUser,
    renderChat,
    done);

  app.get('/add-data',
    setTitle('Test add'),
    setCountries,
    setCompanies,
    renderTestAdd,
    done);

  app.post('/add-user',
    redirectTo('/', { force : true, loggedOutOnly : true }),
    setTitle('Know me'),
    insertPerson,
    redirectTo('/add-data'),
    done);

  app.post('/add-company',
    redirectTo('/', { force : true, loggedOutOnly : true }),
    setTitle('Know me'),
    insertCompany,
    redirectTo('/add-data'),
    done);
}
