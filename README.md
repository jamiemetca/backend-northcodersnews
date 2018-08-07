# Northcoders News (Backend)

Northcoder News is a Reddit themed news aggragation site. It is a RESTful api with routes allowing the following.
Users and can;
Write, comment on or vote up/down articles.
Vote up/down comments.
Delete articles of comments if they are the author.

It is built using a Node.js Express server, which is hosted via Heroku. It is also connected to a MongoDB database which is hosted via Mlabs.

## Getting Started

- Fork this repository to your github account
- Clone this repository on your local machine
```
$ git clone <the forked repo URL>
```
- change directory into it 
```
$ cd <cloned repo>
```

### Prerequisites

Project dependancies are the following;
- body-parser
- cors
- express
- mongoose

Install the project dependencies use 
```
$ npm install
```

A config file is also required for connecting to the database.
- Create a config file in the root directory
```
$ mkdir config.js
```
- Change directory into the config file and create an index.js file. This will house the configuration setting for the project.
```
$ cd config
$ touch index.js
```

Inside this file, export DB_URL and if required Port. This will very depending on the project environment process.env.NODE_ENV.
It can be any of the following;
- Testing
- Development
- Production

The below is set to dev by default.
```
const NODE_ENV = process.env.NODE_ENV || "dev";

const config = {
  dev: {
    DB_URL: "mongodb://localhost:27017/nc_news",
    PORT: 9090
  },
  test: {
    DB_URL: "mongodb://localhost:27017/test_nc_news",
    PORT: 9090
  },
  production: {
    DB_URL:
      "mongodb://<with the link to your mlabs database>"
  }
};

module.exports = config[NODE_ENV];

```

### Installing

Development dependancies are;
- chai
- mocha
- nodemon
- supertest

These can be installed with the npm install command followed by a list of the packages with a space between each e.g.
```
$ npm install -D chai mocha ...
```

## Running the tests
- Start mongod in the terminal to listen for database queries
```
$ mongod
```

- In another terminal run the tests with
```
$ npm test
```
- The spec file will re-seed the database before each test.
- Each endpoint is tested and errors for the happy path are tested.
- To check the result of an individual test use `.only` after `describe` or `it`

## Deployment

The deployed project can be found [here](https://calm-forest-98675.herokuapp.com/api/)

## Authors

- **Jamie Metcalfe**