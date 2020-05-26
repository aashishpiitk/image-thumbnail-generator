'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _expressValidator = require('express-validator');

exports.login = [(0, _expressValidator.body)('username', 'Username required.(must be 3 to 30 characters long').isLength({
	min: 3,
	max: 30
}).isString().trim(), (0, _expressValidator.body)('password', 'Password must be atleast 6 to 50 characters long').isLength({
	min: 6,
	max: 50
}), function (req, res, next) {
	var errors = (0, _expressValidator.validationResult)(req);
	if (!errors.isEmpty()) {
		res.status(400).send({
			errors: errors.array()
		});
	} else {
		var username = req.body.username;
		var token = (0, _jsonwebtoken.sign)({
			username: username
		}, 'secret_key', {
			expiresIn: '1h'
		});

		res.status(200).json({
			user: username,
			token: token,
			authorized: true
		});
	}
}];