const User = require('../models/userModel');
const AppError = require('../error/AppError');
const userValidation = require('./userValidation');
const mongoose = require('mongoose');
const fs = require('fs');
const { search } = require('../routes/userRoutes');

// TODO: Confirm / Run Unit Tests
exports.createUser = async ({
  name,
  password,
  age,
  interests,
  description,
}) => {
  userValidation.validateString(name);
  userValidation.validateString(password);

  const newUser = await User.create({
    name,
    password,
    age,
    interests,
    description,
  });
  return newUser; // Return the newly created user
};

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

// Features Of Function
// Create a modular function that does the following:
// - This will return a total interest count:
// For example: Tennis: 4 , Coding :9 , //
exports.categorizeUserByInterest = async () => {
  const result = await User.aggregate([
    { $unwind: '$interests' }, // Deconstruct 'interests' array into individual elements
    {
      $group: {
        _id: '$interests', // Group by the 'interests' field
        totalUsers: { $sum: 1 }, // Count the number of users with each interest
      },
    },
  ]);
  return result;
};

exports.categorizeUserByOldestAge = async () => {
  const data = await User.aggregate([
    {
      // By combining $sort with $limit (set to 1), you ensure:
    },
  ]);
};

//____________________________________________________________________________________________________________
// Step 1: My desired interest is to get a series of descriptions by each user in an Array format.
// Step 2: Then I want to search through each instances to see if there are matches.
// Step 3: If there is a match from the word to an element in the array of strings that we aggregated.
// Step 4: Return that Object.
exports.searchDescriptionByKeyWord = async (word) => {
  const result = await User.aggregate([
    {
      $match: {
        description: { $regex: new RegExp(`\\b${word}\\b`, 'i') },
      },
    },
  ]);

  return result;
};

// Step 1: My desired interest is to get a series of descriptions by each user in an Array format.
// Step 2: Then I want to search through each instances to see if there are matches.
// Step 3: If there is a match from the word to an element in the array of strings that we aggregated.
// Step 4: Return that Object
const searchUserJson = async () => {
  fs.readFile(
    'November_Node/CRUD_Practice/files/users.json',
    'utf8',
    (err, data) => {
      if (err) {
        console.log('here');
        console.error(err);
        return;
      }
      console.log(data); // Output the content of the file
    }
  );
};

console.log(searchUserJson());
