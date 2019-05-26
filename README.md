# Random Phone Number Genrator
[![Build Status](https://travis-ci.org/johnkingzy/phone-number-generator-vuejs.svg?branch=master)](https://travis-ci.org/johnkingzy/phone-number-generator-vuejs) [![Coverage Status](https://coveralls.io/repos/github/johnkingzy/phone-number-generator-vuejs/badge.svg?branch=develop)](https://coveralls.io/github/johnkingzy/phone-number-generator-vuejs?branch=develop)
[![Netlify Status](https://api.netlify.com/api/v1/badges/aa461522-f2e7-4664-b395-15a4374ac96d/deploy-status)](https://app.netlify.com/sites/raphgen/deploys)

- Production Url: https://raphgen.netlify.com/
- Staging Url: https://raphgen.herokuapp.com/

## Task
There is a startup that generates random phone numbers for a telecommunications company. You are tasked as the developer to work on this project. The length of a phone number has to be 10 digits (all starting with zero) and should always be unique. Present an efficient application in React.js (or Angular, or Node, or VueJs…. anything, depending on your stack). 

Note that, due to financial reasons, they can't purchase a database right now and would like to use their existing file storage to hold everything. As part of auditing, they would want to know the total number of phone numbers generated and the list of numbers anytime. While treating the phone numbers as integers, they would want to sort all generated numbers in ascending/descending order as well as find the max and min generated number. The company doesn’t need a huge number of phone numbers generated at any given time-- 10,000 would be plenty (a file size of 3-4 MB at maximum). If you run the generator twice, it should produce new numbers each time.

As part of requirements, you have been requested to present a well tested application with a minimum of 90% test coverage.

## Project Description
A Random Phone Number Generator built with VueJS (Frontend) and Nodejs (Backend). It provides an Intuitive User-Interface that allows users to generate and sort random phone numbers, utilizing a file storage system for storing generated numbers.

- Live URL
- Technologies used
    - [Bulma](https://bulma.io/) - A free, open source CSS framework based on Flexbox.
    - [VueJS](https://vuejs.org/) - A Progressive Web App Framework.
    - [Node.js](https://nodejs.org) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
    - [ExpressJS](https://expressjs.com) - A minimal and flexible Node.js web application framework.
    - [Mocha](https://mochajs.org) - A JavaScript test framework for Node.js.
    - [Jest](https://jestjs.io) - A delightful JavaScript Testing Framework with a focus on simplicity.
    - [Nightwatch](https://nightwatchjs.org) - An easy to use End-to-End testing solution written on Node.js
- Screenshots

![page-screenshot](https://github.com/johnkingzy/phone-number-generator-vuejs/blob/develop/client/static/screenshots/ui.jpg?raw=true)

## Client-side setup
The `/client` folder contains the Frontend source.

### Build Setup

``` bash
# change directory
cd client
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# run code coverage
npm run coveralls
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Server-side setup
The `/server` contains the Backend source with documentation on how to setup.
### Build setup

```bash
# change directory
cd server

# install dependencies
npm install

# start the development server
npm run start:dev

# start the staging or production server
npm start

# run tests
npm test
```
### Environment Variables
Set environment variables using the `.env` file, you can rename the `.env.sample` file that contains the currently used variables
