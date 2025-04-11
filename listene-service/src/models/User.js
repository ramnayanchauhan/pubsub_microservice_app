const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  user: String,
  class: String,
  age: Number,
  email: String,
  inserted_at: String,
  modified_at: String,
});

module.exports = mongoose.model('UserTest', userSchema);