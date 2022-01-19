const AWS = require('aws-sdk');
const config = require('./config.js')

module.exports = new AWS.S3(config.s3);