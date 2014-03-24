
/**
 * Module dependencies
 */
var Resource      = require('deployd/lib/resource'),
    util          = require('util'),
    redis         = require('redis'),
    client        = redis.createClient();

console.log("redis client: " + client);
client.on("error", function (err) {
  console.log("Error " + err);
});
/**
 * Module setup.
 */
function Redis( options ) {
  Resource.apply(this, arguments);
}

util.inherits( Redis, Resource );

Redis.events = ["get", "post"];

Redis.prototype.clientGeneration = true;

Redis.basicDashboard = {
  settings: [
    {
      name        : 'redisConfig',
      type        : 'string',
      description : 'location of the redis config file'
    }
  ]
};

/**
 * Module methodes
 */
Redis.prototype.handle = function ( ctx, next ) {

  // handle a specific request to the redis service

  console.log("Redis handle");
  next();

  /*

  client.set(ctx.body.key, ctx.body.value, function(error, res) {
    ctx.done(error, res);
  });
  */
};

/**
 * Module export
 */
module.exports = Redis;