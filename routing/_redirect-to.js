module.exports = redirectTo;

function redirectTo(redirectPath, { force = false } = {}) {
  return (req, res, next) => {
    let requestedRedirectURL = req.query.redirecturl || req.body.redirecturl;

    if (!force && requestedRedirectURL) {
      res.redirect(requestedRedirectURL);
    } else {
      res.redirect(redirectPath);
    }
    next();
  }
}
