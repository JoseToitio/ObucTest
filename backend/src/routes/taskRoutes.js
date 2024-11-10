const { Router } = require('express');
const taskController = require('../controllers/taskController');
const { authenticate } = require('../controllers/userController');

const router = Router();

router.route('/tasks')
    .get(authenticate, taskController.getAllTasks)
    .post(authenticate, taskController.createTask)

router.route('/tasks/:id')
    .get(taskController.getTaskById)
    .patch(taskController.updateTask)
    .delete(authenticate, taskController.deleteTask)

module.exports = router;
