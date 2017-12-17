module.exports = renderTestAdd;

function renderTestAdd(req, res, next) {
  res
    .status(200)
    .render('test-add', res.locals.hbs);
  next();
}
