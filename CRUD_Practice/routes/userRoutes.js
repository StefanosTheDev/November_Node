const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.route('/').post(userController.createUser);
router.route('/').get(userController.getAllUsers);

// Categorize User By Interest (GET)
router.route('/interests').get(userController.categorizeUserByInterest);

// Get The Oldest Age # From the Database (GET)
router.route('/oldest').get(userController.findOldestUser);

router.route('/age').get(userController.getTotalAge);
router
  .route('/:id')
  .delete(userController.deleteUserById)
  .put(userController.updateUser);

router.route('/search').post(userController.searchDescription);
module.exports = router;
