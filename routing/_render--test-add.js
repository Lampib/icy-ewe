let router = require('express').Router();

module.exports = (req, res, next) => {
  res.render('test-add', res.locals.hbs);
  next();
};
