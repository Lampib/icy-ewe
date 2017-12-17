let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let sassMiddleware = require('node-sass-middleware');
let babelify = require('express-babelify-middleware');
var hbs = require('hbs');

let index = require('./routes/index');
let chat = require('./routes/chat');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i)
      accum += block.fn(i);
  return accum;
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // false = .scss
  sourceMap: true,
  prefix:  '/assets',
}));
app.use('/assets/javascripts/icy-ewe.*.js', babelify('public/javascripts/icy-ewe.js'));
app.use('/assets/javascripts/index.*.js', babelify('public/javascripts/index.js'));
app.use('/assets', express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/icy-ewe', chat);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
