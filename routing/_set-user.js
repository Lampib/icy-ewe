module.exports = setUser;

function setUser(req, res, next) {
  res.locals.hbs || (res.locals.hbs = {});
  res.locals.hbs.user = {
    loggedIn: !!req.user,
    data: req.user,
  };

  next();
}
