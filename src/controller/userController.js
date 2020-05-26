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
	body('username', 'Username required.(must be 3 to 30 characters long')
	.isLength({
		min: 3,
		max: 30
	})
	.isString()
	.trim(),
	body('password', 'Password must be atleast 6 to 50 characters long').isLength({
		min: 6,
		max: 50
	}),

	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).send({
				errors: errors.array(),
			});
		} else {
			const username = req.body.username;
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