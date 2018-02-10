module.exports = renderTemplate;

function renderTemplate(templateName) {
  return (req, res, next) => {
    res
      .status(200)
      .render(templateName, res.locals.hbs);
    next();
  }
}
