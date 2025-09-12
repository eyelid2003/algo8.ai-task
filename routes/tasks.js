const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  searchTasks,
} = require('../controllers/taskController');

router.use(authMiddleware);

router.route('/')
  .post(createTask)
  .get(getTasks);

router.get('/search', searchTasks);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;