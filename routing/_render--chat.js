let router = require('express').Router();

module.exports = (req, res, next) => {
  res.render('chat', res.locals.hbs);
  next();
};
