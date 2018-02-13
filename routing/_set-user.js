module.exports = setUser;

function setUser(req, res, next) {
  res.locals.hbs.user = {
    loggedIn     : !!req.user,
    isDisplay    : !!req.user && !!req.user.display,
    isAdmin      : !!req.user && (!!req.user.admin || !!req.user.super_admin),
    isSuperAdmin : !!req.user && !!req.user.super_admin,
    data         : req.user,
  };

  next();
}
