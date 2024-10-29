const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.route('/').post(userController.createUser);
router.route('/').get(userController.getAllUsers);
router.route('/interests').get(userController.categorizeUserByInterest);

router.route('/age').get(userController.getTotalAge);
router
  .route('/:id')
  .delete(userController.deleteUserById)
  .put(userController.updateUser);

router.route('/search').post(userController.searchDescription);
module.exports = router;
