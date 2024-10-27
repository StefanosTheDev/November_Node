const AppError = require('../error/AppError');
const User = require('../models/userModel');
// Validate Name
exports.validateName = (name) => {
  // Check if the string has special charachters
  if (!name || typeof name !== 'string' || name.length < 3) {
    throw new AppError('Name does not meet the parameter', 400);
  }
};

// basic things with password
exports.validatePassword = (password) => {
  if (!password || typeof password !== 'string' || password.length < 5) {
    throw new AppError('Password does not meet the requirements', 400);
  }
};

exports.passwordScore = (password) => {
  // Requirements:
};
exports.validateAge = (age) => {};
