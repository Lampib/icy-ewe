module.exports = redirectTo;

function redirectTo(redirectPath) {
  return (req, res, next) => {
    res.redirect(redirectPath);
    //next();
  }
}
