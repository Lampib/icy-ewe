module.exports = setAuthenticator;

function setAuthenticator(req, res, next) {
  res.locals.hbs.email         = req.body.email         || req.query.email         || '';
  res.locals.hbs.authenticator = req.body.authenticator || req.query.authenticator || '';

  next();
}
