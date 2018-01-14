module.exports = renderIndex;

function renderIndex(req, res, next) {
  res
    .status(200)
    .render('log-in', res.locals.hbs);
  next();
}
