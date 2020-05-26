'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.returnThumbnail = returnThumbnail;

var _fs = require('fs');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _isImageUrl = require('is-image-url');

var _isImageUrl2 = _interopRequireDefault(_isImageUrl);

var _jsonwebtoken = require('jsonwebtoken');

var _imagemagick = require('imagemagick');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ext;

//Usage instructions for download() function
// const url = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'
// const path = '../images/image.png'

var download = function download(url, path, callback) {
  (0, _request.head)(url, function (err, res, body) {
    (0, _request2.default)(url).pipe((0, _fs.createWriteStream)(path)).on('close', callback);
  });
};

function returnThumbnail(req, res, next) {
  ext = (0, _path.extname)(req.body.imageUrl);
  (0, _jsonwebtoken.verify)(req.body.token, 'secret_key', function (err, username) {
    if (err) {
      res.status(400).json({
        message: 'User not authorized',
        authorized: false
      });
    } else {
      console.log(req.body);
      if ((0, _isImageUrl2.default)(req.body.imageUrl)) {
        console.log('ext' + ext);
        var now = new Date();
        var d = now.getMilliseconds();
        download(req.body.imageUrl, (0, _path.join)(__dirname + '../../../images/actual/') + d + ext, function () {
          console.log('image downloaded');

          (0, _imagemagick.resize)({
            srcPath: (0, _path.join)(__dirname + '../../../images/actual/') + d + ext,
            dstPath: (0, _path.join)(__dirname + '../../../images/resized/') + d + 'thumbnail' + ext,
            width: 50,
            height: 50
          }, function (err, stdout, stderr) {
            if (err) {
              res.status(404).json({
                message: 'error in resizing the image'
              });
            }
            res.status(200);
            res.json({
              converted: true,
              imagePath: 'http' + '://' + req.get('host') + '/images/resized/' + d + 'thumbnail' + ext,
              authorized: true
            });
            console.log('resized image to fit within 20x50px');
          });
        });
      } else {
        res.status(400).json({
          message: 'try with a valid image url such as .jpg, .png ,etc.'
        });
      }
    }
  });
}