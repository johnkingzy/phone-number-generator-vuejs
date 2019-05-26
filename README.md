# Random Phone Number Genrator
[![Build Status](https://travis-ci.org/johnkingzy/phone-number-generator-vuejs.svg?branch=master)](https://travis-ci.org/johnkingzy/phone-number-generator-vuejs) [![Coverage Status](https://coveralls.io/repos/github/johnkingzy/phone-number-generator-vuejs/badge.svg?branch=develop)](https://coveralls.io/github/johnkingzy/phone-number-generator-vuejs?branch=develop)

## Task
There is a startup that generates random phone numbers for a telecommunications company. You are tasked as the developer to work on this project. The length of a phone number has to be 10 digits (all starting with zero) and should always be unique. Present an efficient application in React.js (or Angular, or Node, or VueJs…. anything, depending on your stack). 

Note that, due to financial reasons, they can't purchase a database right now and would like to use their existing file storage to hold everything. As part of auditing, they would want to know the total number of phone numbers generated and the list of numbers anytime. While treating the phone numbers as integers, they would want to sort all generated numbers in ascending/descending order as well as find the max and min generated number. The company doesn’t need a huge number of phone numbers generated at any given time-- 10,000 would be plenty (a file size of 3-4 MB at maximum). If you run the generator twice, it should produce new numbers each time.

As part of requirements, you have been requested to present a well tested application with a minimum of 90% test coverage.

## Project Description
A Random Phone Number Generator built with VueJS (Frontend) and Nodejs (Backend). It provides an Intuitive User-Interface that allows users to generate and sort random phone numbers, utilizing a file storage system for storing generated numbers.

- Live URL
- Technology Stack
    - VueJS
    - NodeJS
    - ExpressJS
    - Mocha & Jests for Unit testing
    - Nightwatch & Selenium Driver for E2E testing
- Screenshots

The `/client` folder contains the Frontend source with documentation on how to setup.

The `/server` contains the Backend source with documentation on how to setup.