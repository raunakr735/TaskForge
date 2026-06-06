const express = require('express');
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  getTaskStats,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { createTaskValidation, updateTaskValidation } = require('../middleware/validate');

router.get('/stats', protect, getTaskStats);
router.post('/', protect, createTaskValidation, createTask);
router.get('/', protect, getAllTasks);
router.get('/:id', protect, getTaskById);
router.put('/:id', protect, updateTaskValidation, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;
