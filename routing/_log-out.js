module.exports = logOut;

function logOut(req, res, next) {
  req.logout && req.logout();
  next();
}
