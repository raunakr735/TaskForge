const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  markComplete,
  deleteTask,
} = require('../controllers/taskController');
const { createTaskRules, updateTaskRules, validate } = require('../middleware/validate');

router.post('/', createTaskRules, validate, createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTaskRules, validate, updateTask);
router.patch('/:id/complete', markComplete);
router.delete('/:id', deleteTask);

module.exports = router;
