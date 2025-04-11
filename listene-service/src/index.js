const mongoose = require('mongoose');
const redis = require('redis');
const moment = require('moment');
const User = require('./models/User');
require('dotenv').config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const redisClient = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });
  await redisClient.connect();

  const subscriber = redisClient.duplicate();
  await subscriber.connect();

  await subscriber.subscribe('userChannel', async (message) => {
    const data = JSON.parse(message);
    const updatedData = new User({
      ...data,
      modified_at: moment().toISOString(),
    });
    await updatedData.save();
    console.log('Data copied to listener DB');
  });
})();
