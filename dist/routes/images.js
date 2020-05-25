'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _imageController = require('../controller/imageController');

var router = (0, _express.Router)();


router.post('/generate-thumbnail', _imageController.returnThumbnail);

exports.default = router;