const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

const cache = (req, res, next) => {
  const key = req.originalUrl;
  client.get(key, (err, data) => {
    if (err) throw err;
    if (data) {
      return res.send(JSON.parse(data));
    } else {
      res.originalSend = res.send;
      res.send = (body) => {
        client.setex(key, 3600, JSON.stringify(body)); // Cache for 1 hour
        res.originalSend(body);
      };
      next();
    }
  });
};

module.exports = cache;
