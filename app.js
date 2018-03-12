let express        = require('express');
let mysql          = require("mysql");
let expressSession = require('express-session');
let MySQLStore     = require('express-mysql-session')(expressSession);
let path           = require('path');
let favicon        = require('serve-favicon');
let logger         = require('morgan');
let cookieParser   = require('cookie-parser');
let bodyParser     = require('body-parser');
let sassMiddleware = require('node-sass-middleware');
let babelify       = require('express-babelify-middleware');
let fileUpload     = require('express-fileupload');
let fs             = require('fs');
let uglifyJS       = require("uglify-es");

let app      = express('./config/app');
let hbs      = require('./config/hbs');
let db       = require('./config/db');
let passport = require('./config/passport');
let routes   = require('./routes');

global.appRoot = path.resolve(__dirname);

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
app.use((req, res, next) => {
  if (req.user && req.user.password === '$2a$11$EWVucNkpT8O1Qzf5U3naJuOGnyOrgZX7Ii60EDHGbAzI3vIVElco.') {
    console.log('No password!');
  }
  next();
});

let options = {
  host     : process.env.DB_HOST,
  database : process.env.DB_NAME,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  port     : 3306,
};
let connection = mysql.createConnection(options);
let sessionStore = new MySQLStore({}, connection);

// JavaScript bundle
app.use('/assets/javascripts/icy-ewe-bundle.*.js', babelify('public/javascripts/icy-ewe.js', {debug : false}, {presets : ["env"], minified : true}));
// Javascript modules
app.use('/assets/javascripts/icy-ewe.*.js', (req, res, next) => {
  res.locals.jsPath = 'public/javascripts/icy-ewe.js';
  next();
}, minifyJS);
app.use('/assets/javascripts/_*.js', (req, res, next) => {
  res.locals.jsPath = `public/javascripts/_${ req.originalUrl.split('/_')[1] }`;
  next();
}, minifyJS);

app.use('/assets/javascripts/index.*.js', babelify('public/javascripts/index.js', {debug : false}, {minified : true}));
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret            : 'I h@ve only the bester@test secrets in this y@rd!',
  resave            : true,
  saveUninitialized : true,
  store             : sessionStore,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.hbs = {
    debug: process.env.DEBUG,
  };
  next();
});

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

function minifyJS(req, res, next) {
  fs.readFile(path.join(__dirname, res.locals.jsPath), 'utf8', (err, str) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.status(200)
       .send(uglifyJS.minify(str).code);
  });
}
