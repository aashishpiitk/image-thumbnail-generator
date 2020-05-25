import {
  createWriteStream
} from 'fs';
import request, {
  head
} from 'request';
import isImageUrl from 'is-image-url';
import {
  verify
} from 'jsonwebtoken';
import {
  resize
} from 'imagemagick';
import {
  extname,
  join
} from 'path';
var ext;

// var download = (uri, filename, callback) => {

// }
const download = (url, path, callback) => {
  head(url, (err, res, body) => {
    request(url).pipe(createWriteStream(path)).on('close', callback);
  });
};

// const url = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'
// const path = '../images/image.png'

// download(url, path, () => {
//   console.log('✅ Done!')
// })

export function returnThumbnail(req, res, next) {
  ext = extname(req.body.imageUrl);
  verify(req.body.token, 'secret_key', (err, username) => {
    if (err) {
      res.status(400).json({
        message: 'User not authorized',
        authorized: false,
      });
    } else {
      console.log(req.body);
      if (isImageUrl(req.body.imageUrl)) {
        console.log('ext' + ext);
        const now = new Date();
        const d = now.getMilliseconds();
        download(
          req.body.imageUrl,
          join(__dirname + '../../../images/actual/') + d + ext,
          () => {
            console.log('image downloaded');

            resize({
                srcPath: join(
                    __dirname + '../../../images/actual/',
                  ) +
                  d +
                  ext,
                dstPath: join(
                    __dirname + '../../../images/resized/',
                  ) +
                  d +
                  'thumbnail' +
                  ext,
                width: 50,
                height: 50,
              },
              (err, stdout, stderr) => {
                if (err) {
                  res.status(404).json({
                    message: 'error in resizing the image',
                  });
                }
                res.status(200);
                res.sendFile(
                  join(
                    __dirname + '../../../images/resized/',
                  ) +
                  d +
                  'thumbnail' +
                  ext,
                );
                res.json({
                  converted: true,
                  imagePath: 'http' +
                    '://' +
                    req.get('host') +
                    '/images/resized/' +
                    d +
                    'thumbnail' +
                    ext,
                  authorized: true,
                });
                console.log(
                  'resized image to fit within 20x50px',
                );
              },
            );
          },
        );
      } else {
        res.status(400).json({
          message: 'try with a valid image url such as .jpg, .png ,etc.',
        });
      }
    }
  });
}

// const sendFiles = () => {

// }