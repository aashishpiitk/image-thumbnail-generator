'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _expressValidator = require('express-validator');

exports.login = [(0, _expressValidator.body)('username', 'Username required.').isLength({
	min: 3
}).trim(), (0, _expressValidator.body)('password', 'Password must be atleast six characters long').isLength({
	min: 6
}), function (req, res, next) {
	console.log(req.body.username);
	var errors = (0, _expressValidator.validationResult)(req);
	console.log(req.body.username);
	if (!errors.isEmpty()) {
		res.status(400).send({
			errors: errors.array()
		});
	} else {
		console.log(req.body.username);
		var username = req.body.username;
		//console.log(usernames);

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