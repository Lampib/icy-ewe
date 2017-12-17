let router = require('express').Router();

/* GET home page. */
module.exports = (req, res, next) => {
  res.render('index', res.locals.hbs);
  next();
}
