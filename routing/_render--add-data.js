module.exports = renderTestAdd;

function renderTestAdd(req, res, next) {
  res
    .status(200)
    .render('add-data', res.locals.hbs);
  next();
}
