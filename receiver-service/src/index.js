const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const User = require('./models/User');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
redisClient.connect();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.get('/',(req,res)=>{
  res.send('Receiver Service is Running!!!')
})
app.post('/receiver', async (req, res) => {
  try {
    const { user, class: className, age, email } = req.body;
    if (!user || !className || !age || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newUser = new User({
      id: uuidv4(),
      user,
      class: className,
      age,
      email,
      inserted_at: moment().toISOString(),
    });

    const savedUser = await newUser.save();

    await redisClient.publish('userChannel', JSON.stringify(savedUser));

    res.status(201).json({ message: 'User received and published', data: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Receiver service listening on port ${PORT}`));
