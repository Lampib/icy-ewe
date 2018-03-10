module.exports = setUser;

function setUser(req, res, next) {
  res.locals.hbs.query = req.query;

  next();
}
