module.exports = setUser;

function setUser(req, res, next) {
  res.locals.hbs.user = {
    loggedIn: !!req.user,
    isPrimary: !!req.user && !!req.user.primary,
    data: req.user,
  };

  next();
}
