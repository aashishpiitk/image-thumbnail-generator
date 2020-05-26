import {
	equal,
	to,
	expect
} from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
import app from '../app';

describe('image thumbnail microservice', () => {
	//create dummy login data
	const loginDetails = {
		username: 'aashishp',
		password: '123456',
	};

	//to save the token generated during login
	let token;

	const imageUrl =
		'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png';
	const invalidImageUrl =
		'https://homepages.cae.wisc.edu/~ece533/images/arctichare';

	//mock user authentication
	describe('Mock authentication', () => {
		it('It should not log user in if password do not meet requirements( atleast 6 characters long) ', (done) => {
			chai.request(app)
				.post('/users/login')
				.send({
					username: 'aashishp',
					password: '',
				})
				.end((err, res) => {
					expect(res.statusCode).to.equal(400);
					done();
				});
		});

		it('It should not log in the user if the username does not meet the requirements(atleast 3 characters long)', (done) => {
			chai.request(app)
				.post('/users/login')
				.send({
					username: 'yo',
					password: '123456',
				})
				.end((err, res) => {
					expect(res.statusCode).to.equal(400);
					done();
				});
		});

		it('It should log in the user and return a signed JWT', (done) => {
			chai.request(app)
				.post('/users/login')
				.send(loginDetails)
				.end((err, res) => {
					expect(res.statusCode).to.equal(200);
					expect(res.body.authorized).to.equal(true);
					token = res.body.token;
					done();
				});
		});
	});

	describe('Thumbnail creation', () => {
		it('It should not process the image if the token is invalid', (done) => {
			chai.request(app)
				.post('/image/generate-thumbnail')
				.send({
					token: 'token',
					imageUrl: imageUrl,
				})
				.end((err, res) => {
					expect(res.statusCode).to.equal(400);
					done();
				});
		});

		it('It should not process the image if it is in invalid format or if url is invalid', (done) => {
			chai.request(app)
				.post('/image/generate-thumbnail')
				.send({
					token: token,
					imageUrl: invalidImageUrl,
				})
				.end((err, res) => {
					expect(res.statusCode).to.equal(400);
					done();
				});
		});

		it('It should accept a public image and return the link to the resized image', function (done) {
			this.timeout(30000);
			chai.request(app)
				.post('/image/generate-thumbnail')
				.send({
					token: token,
					imageUrl: imageUrl,
				})
				.end((err, res) => {
					// if(err){
					//   j
					// }
					expect(res.statusCode).to.equal(200);
					expect(res.body.converted).to.equal(true);
					done();
				});
		});
	});
});