'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);


describe('image thumbnail microservice', function () {
	//create dummy login data
	var loginDetails = {
		username: 'aashishp',
		password: '123456'
	};

	//to save the token generated during login
	var token = void 0;

	var imageUrl = 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png';
	var invalidImageUrl = 'https://homepages.cae.wisc.edu/~ece533/images/arctichare';

	//mock user authentication
	describe('Mock authentication', function () {
		it('It should not log user in if password do not meet requirements( atleast 6 characters long) ', function (done) {
			_chai2.default.request(_app2.default).post('/users/login').send({
				username: 'aashishp',
				password: ''
			}).end(function (err, res) {
				(0, _chai.expect)(res.statusCode).to.equal(400);
				done();
			});
		});

		it('It should not log in the user if the username does not meet the requirements(atleast 3 characters long)', function (done) {
			_chai2.default.request(_app2.default).post('/users/login').send({
				username: 'yo',
				password: '123456'
			}).end(function (err, res) {
				(0, _chai.expect)(res.statusCode).to.equal(400);
				done();
			});
		});

		it('It should log in the user and return a signed JWT', function (done) {
			_chai2.default.request(_app2.default).post('/users/login').send(loginDetails).end(function (err, res) {
				(0, _chai.expect)(res.statusCode).to.equal(200);
				(0, _chai.expect)(res.body.authorized).to.equal(true);
				token = res.body.token;
				done();
			});
		});
	});

	describe('Thumbnail creation', function () {
		it('It should not process the image if the token is invalid', function (done) {
			_chai2.default.request(_app2.default).post('/image/generate-thumbnail').send({
				token: 'token',
				imageUrl: imageUrl
			}).end(function (err, res) {
				(0, _chai.expect)(res.statusCode).to.equal(400);
				done();
			});
		});

		it('It should not process the image if it is in invalid format or if url is invalid', function (done) {
			_chai2.default.request(_app2.default).post('/image/generate-thumbnail').send({
				token: token,
				imageUrl: invalidImageUrl
			}).end(function (err, res) {
				(0, _chai.expect)(res.statusCode).to.equal(400);
				done();
			});
		});

		it('It should accept a public image and return the link to the resized image', function (done) {
			this.timeout(10000);
			_chai2.default.request(_app2.default).post('/image/generate-thumbnail').send({
				token: token,
				imageUrl: imageUrl
			}).end(function (err, res) {
				// if(err){
				//   j
				// }
				(0, _chai.expect)(res.statusCode).to.equal(200);
				(0, _chai.expect)(res.body.converted).to.equal(true);
				done();
			});
		});
	});
});