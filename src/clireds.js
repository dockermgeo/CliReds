//'use strict'

/*
 * VARIABLES
 */

// Set logger
var logger = require('log4js').getLogger('clireds');
logger.setLevel(process.env.LOG_LEVEL || 'DEBUG');

// Connect-Strings
const _port=process.env.REDIS_PORT||6379;
const arg1=process.argv[2]||"127.0.0.1"
const _host=process.env.REDIS_HOST||arg1;

// REDIS-key-values
const command = process.argv[3];
const namespace = process.argv[4];
const key = process.argv[5];
const value = process.argv[6];

/*
 * FUNCTIONS
 */
function printout(value){
  console.log(value);
  client.quit();
}
function printerr(error){
  logger.error(error);
  process.exit(1);
}
function miss_namespace (namespace) {
  if (namespace==="") {
    logger.error(" * missing namespace");
    process.exit(1);
  }
}
function miss_key(key) {
  if (key==='undefined') {
    logger.error(" * missing key");
    process.exit(1);
  }
}
function miss_value(value) {
  if (value==="") {
    logger.error(" * missing value");
    process.exit(1);
  }
}


function usage() {
  console.log(" * Usage:", "clireds <REDIS_HOST> <COMMAND> <KEY|NAMESPACE> <VALUE|KEY> <VALUE>");
  console.log("", "> Setting REDIS_PORT ENV-Variable for changing defaultport 6379");
  console.log();
  console.log("Commands:");
  console.log("","get","-","Return the value of the key");
  console.log("","hget","-","Return the value of the Namespace.key");
  console.log("","set","-","Set value of key");
  console.log("","hset","-","Set value of Namespace.key");
  console.log("","hjset","-","Set a JSON to Namespace");
  console.log("","hkeys","-","Return keyset of namespace");
  console.log();
  console.log("Examples:");
  console.log("clireds redishost get de.cloud.service.testapp.TESTKEY");
  console.log("clireds redishost set de.cloud.service.testapp.TESTKEY TESTVALUE");
  console.log();
  console.log("clireds redishost hkeys de.cloud.service.testapp");
  console.log("clireds redishost hget de.cloud.service.testapp TESTKEY");
  console.log("clireds redishost hset de.cloud.service.testapp TESTKEY TESTVALUE");
  console.log("clireds redishost hjset de.cloud.service.testapp {\"TESTKEY\":\"TESTVALUE\"}");
  process.exit(0);
}


/*
 * MAIN
 */

// Connect
var redis = require('redis');
var client = redis.createClient(_port, _host);

switch (command) {
  case "hkeys":
      client.hkeys(namespace, function (err, replies) {
          console.log(replies.length + " replies:");
          replies.forEach(function (reply, i) {
              console.log("    " + i + ": " + reply);
          });
          client.quit();
      });
    break;
    case "hget":
      miss_namespace(namespace);
      miss_key(key);

      client.hmget(namespace,key, function(err, reply) {
          if(err){
            printerr(err);
          }
          else {
            printout(reply[0]);
          }
      });
      client.quit();
    break;
    case "get":
      var tkey=namespace;
      miss_key(tkey);

      client.get(tkey, function(err, reply) {
        if(err){
          printerr(err);
        }
        else {
          printout(reply[0]);
        }
      });
      client.quit();
    break;
      case "set":
      var tkey=namespace;
      var tval=key;
      client.set(tkey, tval);
      client.quit();
    break;
    case "hset":
      client.hmset(namespace,key,value);
      client.quit();
    break;
    case "hjset":
      client.hmset(namespace, JSON.parse(key));
      client.quit();
    break;
  default:
    usage();
}
