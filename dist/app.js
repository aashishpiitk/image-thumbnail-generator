'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _authenticate = require('./authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _users = require('./models/users');

var _users2 = _interopRequireDefault(_users);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _images = require('./routes/images');

var _images2 = _interopRequireDefault(_images);

var _users3 = require('./routes/users');

var _users4 = _interopRequireDefault(_users3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var imageRouter = require('./routes/images').default.default.default;

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
// view engine setup
app.set('views', (0, _path.join)(__dirname, 'views'));
app.set('view engine', 'jade');

app.use((0, _morgan2.default)('dev'));
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: false
}));
app.use((0, _cookieParser2.default)());

//serving the static files
app.use(_express2.default.static((0, _path.join)(__dirname, 'public')));
app.use('/images', _express2.default.static(path.join(__dirname, './images')));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'), res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept'), res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS,authorization'), next();
});

//configuring the routers
app.use('/images', _images2.default);
app.use('/users', _users4.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next((0, _httpErrors2.default)(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

exports.default = app;