import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';
import bodyParser from 'body-parser';

import imagesRouter from './routes/images';
import usersRouter from './routes/users';
//var imageRouter = require('./routes/images').default.default.default;

var app = express();
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
// view engine setup
app.set('views', join(__dirname, './views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(
	urlencoded({
		extended: false,
	}),
);
app.use(cookieParser());

//serving the static files
//app.use(express.static(join(__dirname, 'public')));

console.log(join(__dirname, '../images/resized'));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*'),
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Origin,X-Requested-With,Content-Type,Accept',
		),
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET,POST,PATCH,PUT,DELETE,OPTIONS,authorization',
		),
		next();
});

app.use('/images', express.static(join(__dirname, '../images/')));

// app.get('/report/:chart_id/:user_id', function (req, res) {
//     // res.sendFile(filepath);
// });
//configuring the routers
app.use('/image', imagesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
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
export default app;
