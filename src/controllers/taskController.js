const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, category } = req.body;
    const task = await Task.create({ title, description, dueDate, category });
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const { completed, category, sort } = req.query;

    // Build filter
    const filter = {};
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    if (category) {
      filter.category = category;
    }

    // Build sort
    let sortOption = { createdAt: -1 }; // default: newest first
    if (sort === 'dueDate') sortOption = { dueDate: 1 };
    if (sort === 'title') sortOption = { title: 1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };

    const tasks = await Task.find(filter).sort(sortOption);
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, dueDate, category } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (category !== undefined) task.category = category;

    const updatedTask = await task.save();
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark task as completed
// @route   PATCH /api/tasks/:id/complete
exports.markComplete = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.completed) {
      return res.status(400).json({
        success: false,
        message: 'Task is already marked as completed',
      });
    }

    task.completed = true;
    const updatedTask = await task.save();
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
