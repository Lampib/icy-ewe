let passport = require('./config/passport');

let setTitle           = require('./routing/_set-title');
let setCompanies       = require('./routing/_set-companies');
let setProjects        = require('./routing/_set-projects');
let setCountries       = require('./routing/_set-countries');
let setPeople          = require('./routing/_set-people');
let setUser            = require('./routing/_set-user');
let setRedirectURL     = require('./routing/_set-redirect-url');
let setAuthenticator   = require('./routing/_set-authenticator');
let setQueryParams     = require('./routing/_set-query-params');
let setFlashErrors     = require('./routing/_set-flash-errors');

let redirectTo         = require('./routing/_redirect-to');
let logOut             = require('./routing/_log-out');
let initAuthentication = require('./routing/_init-authentication');
let emailChatLink      = require('./routing/_email-chat-link');
let updatePassword     = require('./routing/_update-password');
let done               = require('./routing/_close-connection');

let addJsonHeaders = require('./routing/_add-headers--json');

let insertCompany   = require('./routing/_db-insert--company');
let insertPerson    = require('./routing/_db-insert--person');
let updatePeople    = require('./routing/_db-update--person');
let csvImportPeople = require('./routing/_csv-import--person');
let deletePerson    = require('./routing/_db-delete--person');

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
    setFlashErrors,
    renderTemplate('index'),
    done);

  app.get('/edit-users',
    setTitle(''),
    setUser,
    setPeople,
    setCompanies,
    setProjects,
    setFlashErrors,
    renderTemplate('edit-users'),
    done);

  app.get('/log-out',
    logOut,
    redirectTo('/'),
    done);

  app.get('/log-in',
    setTitle('Log in'),
    setRedirectURL,
    setFlashErrors,
    renderTemplate('log-in'),
    done);

  app.post('/log-in',
    initAuthentication,
    passport.authenticate('local-login', { failureRedirect: '/log-in' }),
    redirectTo('/'),
    done);

  app.get('/update-password',
    setAuthenticator,
    setFlashErrors,
    renderTemplate('update-password'),
    done);

  app.post('/update-password',
    updatePassword,
    passport.authenticate('local-login', { failureRedirect: '/log-in' }),
    redirectTo('/'),
    done);

  app.get('/icy-ewe',
    setTitle('I see you'),
    setUser,
    setQueryParams,
    setFlashErrors,
    renderTemplate('chat'),
    done);

  app.post('/icy-ewe',
    redirectTo('/', { force : true, blockNonAdmin : true }),
    emailChatLink,
    done);

  app.get('/add-data',
    setTitle('Add data'),
    setUser,
    setCountries,
    setCompanies,
    setFlashErrors,
    renderTemplate('add-data'),
    done);

  app.post('/add-person',
    redirectTo('/', { force : true, blockNonAdmin : true }),
    insertPerson,
    redirectTo('/add-data'),
    done);

  app.post('/csv-import-people',
    redirectTo('/', { force : true, blockNonAdmin : true }),
    csvImportPeople,
    redirectTo('/add-data'),
    done);

  app.post('/add-company',
    redirectTo('/', { force : true, blockNonAdmin : true }),
    insertCompany,
    redirectTo('/add-data'),
    done);

  app.patch('/ajax/person',
    redirectTo('/not-done', { force : true, blockNonAdmin : true }),
    updatePeople,
    setFlashErrors,
    renderTemplate('done'),
    done);

  app.delete('/ajax/person',
    redirectTo('/not-done', { force : true, blockNonAdmin : true }),
    deletePerson,
    setFlashErrors,
    renderTemplate('done'),
    done);

  app.all(/^\/.*/, (req, res, next) => {
    if (process.env.DEBUG) {
      return next();
    }
    return res.redirect('/');
  });
}
