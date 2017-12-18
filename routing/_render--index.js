module.exports = renderIndex;

function renderIndex(req, res, next) {
  res
    .status(200)
    .render('index', res.locals.hbs);
  //next();
}
