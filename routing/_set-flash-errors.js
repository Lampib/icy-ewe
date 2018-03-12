module.exports = setUser;

function setUser(req, res, next) {
  res.locals.hbs.flashErrors = req.flash('error');

  next();
}
