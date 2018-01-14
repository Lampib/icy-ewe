module.exports = setRedirectURL;

function setRedirectURL(req, res, next) {
  if (req.query.redirecturl) {
    res.locals.hbs || (res.locals.hbs = {});
    res.locals.hbs.redirecturl = req.query.redirecturl;
  }

  next();
}
