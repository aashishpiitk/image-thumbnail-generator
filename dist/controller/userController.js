'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _check = require('express-validator/check');

var _filter = require('express-validator/filter');

exports.login = [(0, _check.body)('username', 'Username required.').isLength({ min: 3 }).trim(), (0, _check.body)('password', 'Password must be atleast six characters long').isLength({
  min: 6
}), (0, _filter.sanitizeBody)('*'), function (req, res) {
  var errors = (0, _check.validationResult)(req);

  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
  } else {
    username = req.body.username;
    _jsonwebtoken.jwt.sign({ username: username }, 'secret_key', { expiresIn: 3600 }, function (err, token) {
      res.status = 200;
      res.json({
        username: username,
        token: token,
        authorized: true
      });
    });
  }
}];