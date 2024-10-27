const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    unique: [true, 'Name must be unique'],
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    unique: true,
    select: false, // that way this doesn't pop up on the return.
  },
  description: {
    type: String,
  },
  age: {
    type: Number,
    required: [true, 'User must have an age'],
  },
  created_at: {
    type: Date,
    default: Date.now, // Ensures created_at is set when a new user is created
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
