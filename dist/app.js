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

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _swaggerJsdoc = require('swagger-jsdoc');

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _swaggerUiExpress = require('swagger-ui-express');

var _swaggerUiExpress2 = _interopRequireDefault(_swaggerUiExpress);

var _images = require('./routes/images');

var _images2 = _interopRequireDefault(_images);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _swagger_config = require('./swagger_config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//configuring the body parser
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
	extended: true
}));

// view engine setup
app.set('views', (0, _path.join)(__dirname, '/views'));
app.set('view engine', 'jade');

app.use((0, _morgan2.default)('dev'));
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
	extended: false
}));
app.use((0, _cookieParser2.default)());

//serving the static files
app.use('/images', _express2.default.static((0, _path.join)(__dirname, '../images/')));

//configuring the cors headers
console.log((0, _path.join)(__dirname, '../images/resized'));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*'), res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept'), res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS,authorization'), next();
});

//swagger configuration
var swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'Image-Resizer-API',
			description: 'API Information'
		},
		servers: ['http://localhost:3000']
	},
	apis: ['./app.js', __dirname + '/routes/*.js']
};

//const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', _swaggerUiExpress2.default.serve, _swaggerUiExpress2.default.setup(_swagger_config.swaggerDoc));
//app.use('/api-docs', express.static(join(__dirname, '../')));
//Routes
/**
 * @swagger
 *  /users/login:
 * 	post:
 *  responses:
 *  200:
 *      description: 
 * 
 *
 */
//configuring the routers
app.use('/image', _images2.default);
app.use('/users', _users2.default);

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

app.listen(3000, '127.0.0.1');
exports.default = app;