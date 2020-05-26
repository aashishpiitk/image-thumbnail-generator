# Stateless Microservice In Nodejs for creating image thumbnails

## ES6 is used throughout the code and Babel is used to transpile the code to Commonjs format

The following functionalities are implemented in

- Authentication
- Image Thumbnail Generation

## Setup

### The API requires latest **_LTS_** version of [Node.js](https://nodejs.org/en/download/) preferbably \_**\_v12.14.0\_\_** of Nodejs

To get up and running:

**1.** Clone the repo.

```
git clone https://github.com/aashishpiitk/image-thumbnail-generator
```

**2.** `cd` into repo. Use the same directory name(below) if you do not change it.

```
cd image-thumbnail-generator
```

**3.** Setup the application by installing its dependencies with

```
npm install
```

**4.** Install the following packeges as glocal npm packages

```
npm install -g nodemon eslint swagger
```

**5.** Running the app in development mode

Run the command below from the application's root directory.
The app gets up and running on port 3000 with

```
npm run dev
```

Access the server on http://localhost:3000/

**6.** Running the unit tests

Run the command below from the application's root directory.

```
npm run test
```

# Testing the API routes.

Since this is mostly an API with post and patch requests, testing will be done with [Postman](https://www.getpostman.com/)

## Authentication(Login and receiving the JWT token)

This is a mock authentication so you can pass in any username or password to login.

1.  Set the request to **POST** and the url to _http://localhost:3000/users/login_
2.  You will be setting 2 keys (for username and password). <br>
    Set the `username` key to any name.(minimum 3 characters long) <br>
    Set `password` to any password (minimum of 6 characters).

```
Send this info in the body of request
```

```
{
    "username": "aashishp",
    "password": "123456"
}
```

3.  Hit `Send`. You will get a result in this format:

```
{
   "user": "aashishp",
   "authorized": true,
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhd2Zlc2dyIiwiaWF0IjoxNTQ5MTI2OTgwLCJleHAiOjE1NDkxMzA1ODB9.ywbMXejRhwsxg9A3QRcgPbh7bq2DnPBNTL3h2yIpaiM"
}
```

## Image Thumbnail Generation

This request contains a public image URL. It downloads the image, resizes to 50x50 pixels, and returns the resulting thumbnail's link

1.  Set the request to **POST** and the url to _http://localhost:3000/image/generate-thumbnail_.
2.  Set the key `imageUrl` to a public image url.

```
Send this info in the body of request
```

```
{
    "imageUrl": "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhd2Zlc2dyIiwiaWF0IjoxNTQ5MTI2OTgwLCJleHAiOjE1NDkxMzA1ODB9.ywbMXejRhwsxg9A3QRcgPbh7bq2DnPBNTL3h2yIpaiM"
}
```

3.  The token generated earlier will be patched with the key.
4.  At first, if JWT is missing or invalid then the request will be rejected otherwise,
5.  Image will be downloaded and converted to a thumbnail of size 50x50 pixels with a sample result as below:

```
{
   "authorized": true
   "converted": true
   "imagePath": "http://localhost:3000/images/resized/60thumbnail.png",
}
```

6.Use **ctrl**+**mouse click** to click on the imagePath which opens the resized image in browser

## Unit Testing

Unit testing is done using **_mochai = mocha + chai(asserion)_**

## Linting

### Linting is done using **_eslint + airbnb_config_**

### Autoformatting is done using **prettier**

## Transpiling

### The ES6 code is not compatible with the **LTS version of nodejs** so I used **_Babel_** to transpile the **_ES6_** code to **_CommonJs_** format

## API Testing

### Is done using Postman

The tranpiled code can be obtained in a directory named **dist** in the root directory using the command **_npm run build_**

## Built With

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com/)
- [Mocha](https://mochajs.org/) - For testing
- [Babel]() - For transpiling
