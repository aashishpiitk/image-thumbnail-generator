'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _userController = require('../controller/userController');

var router = (0, _express.Router)();


router.post('/login', _userController.login);

exports.default = router;