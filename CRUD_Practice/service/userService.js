const User = require('../models/userModel');
const AppError = require('../error/AppError');
const userValidation = require('./userValidation');
const mongoose = require('mongoose');
// TODO: Confirm / Run Unit Tests
exports.createUser = async ({ name, password, age }) => {
  userValidation.validateName(name);
  userValidation.validatePassword(password);

  const newUser = await User.create({ name, password, age });
  return newUser; // Return the newly created user
};

// TODO: Get All Users
exports.getAllUsers = async () => {
  const users = await User.find(); // Query to find all users. // This returns an empty array. if it is empty
  if (users.length === 0) throw new AppError('Users Database is Empty', 400);
  return users;
};
exports.deleteUserById = async (id) => {
  // Convert the string to id to Object ID

  // Attempt to delete the user
  const deleteUser = await User.findByIdAndDelete(id);

  // If the user is not found, throw an error
  if (!deleteUser) {
    throw new AppError('User not found', 400);
  }

  // Return the deleted user if successful
  return deleteUser;
};

exports.getTotalAge = async () => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          totalAge: { $sum: '$age' },
        },
      },
    ]);
    return result;
    // This will return an array with the sum of ages
    // Example output: [ { _id: null, totalAge: 450 } ]
  } catch (error) {
    console.error('Error aggregating ages:', error);
  }
};

exports.updateUserById = async (id, updateData) => {
  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validation for updated fields
  });

  if (!updatedUser) {
    throw new Error('User not found'); // Handle user not found case
  }

  return updatedUser;
};

// Delete User By ID

// Update by ID
