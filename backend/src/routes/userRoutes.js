const { Router } = require("express");
const userController = require('../controllers/userController');

const router = Router();

router.route('/users')
  .get(userController.getAllUsers)

router.route('/register').post(userController.registerUser);
router.route('/login').post(userController.loginUser);

module.exports = router;