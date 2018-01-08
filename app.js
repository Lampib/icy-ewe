let express        = require('express');
let path           = require('path');
let favicon        = require('serve-favicon');
let logger         = require('morgan');
let cookieParser   = require('cookie-parser');
let bodyParser     = require('body-parser');
let sassMiddleware = require('node-sass-middleware');
let babelify       = require('express-babelify-middleware');
let fileUpload     = require('express-fileupload');

let app            = express();

let hbsHelpers = require('./config/hbs-helpers');
let db         = require('./config/db.js');
let routes     = require('./routes');

global.appRoot = path.resolve(__dirname);
hbsHelpers.init();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(fileUpload({ safeFileNames: true, fileSize: 30 * 1024 * 1024 }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src            : path.join(__dirname, 'public'),
  dest           : path.join(__dirname, 'public'),
  indentedSyntax : false, // false = .scss
  sourceMap      : true,
  prefix         : '/assets',
  outputStyle    : 'compressed',
}));
app.use('/assets/javascripts/icy-ewe.*.js', babelify('public/javascripts/icy-ewe.js', {debug : false}, {minified : true}));
app.use('/assets/javascripts/index.*.js', babelify('public/javascripts/index.js', {debug : false}, {minified : true}));
app.use('/assets', express.static(path.join(__dirname, 'public')));

routes.init(app);

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
