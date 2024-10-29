const AppError = require('../error/AppError');
const User = require('../models/userModel');
// Validate Name
exports.validateString = (str) => {
  // Check if the string has special charachters
  if (!str || typeof str !== 'string' || str.length < 5) {
    throw new AppError('Name does not meet the parameter', 400);
  }
};

exports.passwordScore = (password) => {
  // Requirements:
};
exports.validateAge = (age) => {};
