const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'], // Basic validation: name is required
  },
  password: {
    type: String,
    required: [true, 'Password is required'], // Basic validation: password is required
  },
  description: {
    type: String,
  },
  age: {
    type: Number,
    min: [18, 'Age must be at least 18'], // Basic validation: minimum age
    max: [100, 'Age must be at most 100'], // Basic validation: maximum age
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  interests: {
    type: [String],
    validate: {
      validator: function (value) {
        return Array.isArray(value) && value.length > 0; // Checks if interests is an array and not empty
      },
      message: 'Interests must be a non-empty array of strings', // Custom error message
    },
    default: [],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
