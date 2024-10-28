const userService = require('../service/userService');
exports.createUser = async (req, res, next) => {
  try {
    // Extract data from request body
    const { name, password, age, interests } = req.body;
    const newUser = await userService.createUser({
      name,
      password,
      age,
      interests,
    });

    // Respond with the created user
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    // Query All Users
    const getAllUsers = await userService.getAllUsers(); // Hit the service

    res.status(201).json({
      status: 'success',
      data: {
        user: getAllUsers,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params; // Extract the id from the request params

    // Pass just the id string, not an object
    const deleteUser = await userService.deleteUserById(id);

    res.status(200).json({
      status: 'delete success',
      data: {
        user: deleteUser,
      },
    });
  } catch (err) {
    next(err);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the user ID from URL params
    const { name, password, description, age } = req.body; // Destructure the potential update fields

    // Build an updateData object with only the fields that are provided
    const updateData = {};
    if (name) updateData.name = name;
    if (password) updateData.password = password;
    if (description) updateData.description = description;
    if (age) updateData.age = age;

    // Call the service to update the user
    const updatedUser = await userService.updateUserById(id, updateData);

    // Respond to the client
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    next(err); // Pass any error to the error-handling middleware
  }
};

exports.getTotalAge = async (req, res, next) => {
  try {
    const totalAge = await userService.getTotalAge();

    res.status(201).json({
      status: 'success',
      data: {
        total: totalAge,
      },
    });
  } catch (err) {
    next(err);
  }
};
