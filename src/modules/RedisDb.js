'use strict'
var redis = require('redis');

var logger = require('log4js').getLogger('RedSetter');
logger.setLevel(process.env.LOG_LEVEL || 'DEBUG');

// Connect RedisDB
const _port=process.env.REDIS_PORT||6379;
const arg1=process.argv[2]||"127.0.0.1"
const _host=process.env.REDIS_HOST||arg1;



var client = redis.createClient(_port, _host);
exports.client;
