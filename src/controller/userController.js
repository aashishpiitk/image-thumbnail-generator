import {
	sign
} from 'jsonwebtoken';
import {
	body,
	check,
	validationResult
} from 'express-validator';
import {
	sanitizeBody
} from 'express-validator';

exports.login = [
	body('username', 'Username required.')
	.isLength({
		min: 3,
	})
	.trim(),
	body('password', 'Password must be atleast six characters long').isLength({
		min: 6,
	}),

	(req, res, next) => {
		console.log(req.body.username);
		const errors = validationResult(req);
		console.log(req.body.username);
		if (!errors.isEmpty()) {
			res.status(400).send({
				errors: errors.array(),
			});
		} else {
			console.log(req.body.username);
			const username = req.body.username;
			//console.log(usernames);

			const token = sign({
				username: username
			}, 'secret_key', {
				expiresIn: '1h',
			});

			res.status(200).json({
				user: username,
				token: token,
				authorized: true,
			});
		}
	},
];