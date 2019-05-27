'use strict'

const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


const env = {};
try {
  const variables = fs.readFileSync(path.resolve(__dirname, '../../.env'), 'utf8');
  if (variables) {
    variables.replace(/(\w+)=((\d+)|.+)/g, ($0, $1, $2) => {
      env[$1] = $2;
    });
  }
} catch (error) {
  console.log('.env not found, Environment variables sets to defaults');
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: JSON.stringify(`http://localhost:${env.PORT || 8000}`)
});
