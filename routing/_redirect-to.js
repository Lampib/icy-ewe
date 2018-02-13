module.exports = redirectTo;

function redirectTo(redirectPath, { force = false, blockNonAdmin = false } = {}) {
  return (req, res, next) => {
    let requestedRedirectURL = req.query.redirecturl || req.body.redirecturl || redirectPath;

    if (blockNonAdmin) {
      if (req.user && (req.user.admin || req.user.super_admin)) {
        return next();
      } else {
        return res.redirect(redirectPath);
      }
    }

    if (!force && requestedRedirectURL) {
      res.redirect(requestedRedirectURL);
    } else {
      res.redirect(redirectPath);
    }

    next();
  }
}
