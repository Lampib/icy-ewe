let passport = require('./config/passport');

let setTitle       = require('./routing/_set-title');
let setCompanies   = require('./routing/_set-companies');
let setProjects    = require('./routing/_set-projects');
let setCountries   = require('./routing/_set-countries');
let setPeople      = require('./routing/_set-people');
let setUser        = require('./routing/_set-user');
let setRedirectURL = require('./routing/_set-redirect-url');
let redirectTo     = require('./routing/_redirect-to');
let logOut         = require('./routing/_log-out');
let done           = require('./routing/_close-connection');

let addJsonHeaders = require('./routing/_add-headers--json');

let insertCompany = require('./routing/_db-insert--company');
let insertPerson  = require('./routing/_db-insert--person');
let deletePerson  = require('./routing/_db-delete--person');

let renderTemplate = require('./routing/_render-template');

module.exports = {
  init,
};

function init(app) {
  app.get('/',
    setTitle(''),
    setUser,
    setPeople,
    setCompanies,
    setProjects,
    renderTemplate('index'),
    done);

  app.get('/log-out',
    logOut,
    redirectTo('/'),
    done);

  app.get('/log-in',
    setTitle('Log in'),
    setRedirectURL,
    renderTemplate('log-in'),
    done);

  app.post('/log-in',
    passport.authenticate('local-login', { failureRedirect: '/log-in' }),
    redirectTo('/'),
    done);

  app.get('/icy-ewe',
    setTitle('I see you'),
    setUser,
    renderTemplate('chat'),
    done);

  app.get('/add-data',
    setTitle('Add data'),
    setUser,
    setCountries,
    setCompanies,
    renderTemplate('add-data'),
    done);

  app.post('/add-person',
    redirectTo('/', { force : true, blockNonAdmin : true }),
    setTitle('Know me'),
    insertPerson,
    redirectTo('/add-data'),
    done);

  app.get('/delete-person/:personuuid',
    redirectTo('/', { force : true, blockNonAdmin : true }),
    setTitle('Know me'),
    deletePerson,
    redirectTo('/'),
    done);

  app.post('/add-company',
    redirectTo('/', { force : true, blockNonAdmin : true }),
    setTitle('Know me'),
    insertCompany,
    redirectTo('/add-data'),
    done);

  app.all(/^\/.*/, (req, res, next) => {
    if (process.env.DEBUG) {
      return next();
    }
    return res.redirect('/');
  });
}
