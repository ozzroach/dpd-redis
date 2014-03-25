
/**
 * Module dependencies
 */
var Resource      = require('deployd/lib/resource'),
    util          = require('util'),
    redis         = require('redis'),
    client        = redis.createClient();

/**
 * Module setup.
 */
function Redis( options ) {
  Resource.apply(this, arguments);
}

util.inherits( Redis, Resource );

Redis.prototype.clientGeneration = true;

/**
 * Module methodes
 */
Redis.prototype.handle = function ( ctx, next ) {
  if (!ctx.body || !ctx.body.method || !ctx.body.key || !ctx.body.value) {
      next();
  } else {
    if (ctx.body.method == "set") {
      console.log("redis set");
      client.set(ctx.body.key, ctx.body.value, function(error, res) {
        if (error) console.log("error " + error);
        ctx.done(error, res);
      });
    } else if (ctx.body.method == "publish") {
      console.log("redis publish");
      client.publish(ctx.body.key, ctx.body.value);
      ctx.done(null, "OK");
    } else {
      next();
    }
  }
};

/**
 * Module export
 */
module.exports = Redis;