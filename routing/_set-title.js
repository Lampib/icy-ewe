module.exports = setTitle;

function setTitle(to = '') {
  return (req, res, next) => {
    res.locals.hbs.title = `Preco${
      to
        ? ` | ${ to }`
        : ''
    }`

    next();
  };
}
