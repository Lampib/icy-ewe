module.exports = setUser;

function setUser(req, res, next) {
  res.locals.hbs.user = {
    loggedIn : !!req.user,
    isPrimary: !!req.user && !!req.user.primary,
    isAdmin  : !!req.user && !!req.user.admin,
    data     : req.user,
  };

  next();
}
