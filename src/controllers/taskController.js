const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo: assignedTo || null,
      createdBy: req.user._id,
    });

    const populated = await task.populate([
      { path: 'createdBy', select: 'name email' },
      { path: 'assignedTo', select: 'name email' },
    ]);

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks for current user
// @route   GET /api/tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, assignedTo, search, sort } = req.query;

    // Build filter: user sees tasks they created OR are assigned to
    const filter = {
      $or: [{ createdBy: req.user._id }, { assignedTo: req.user._id }],
    };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;

    // Text search
    if (search) {
      filter.$and = [
        {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        },
      ];
    }

    // Build sort
    let sortOption = { createdAt: -1 };
    if (sort === 'dueDate') sortOption = { dueDate: 1, createdAt: -1 };
    if (sort === 'title') sortOption = { title: 1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'priority') {
      // High > Medium > Low
      sortOption = { priority: -1, createdAt: -1 };
    }

    const tasks = await Task.find(filter)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort(sortOption);

    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    next(error);
  }
};

// @desc    Get task stats for dashboard
// @route   GET /api/tasks/stats
exports.getTaskStats = async (req, res, next) => {
  try {
    const userFilter = {
      $or: [{ createdBy: req.user._id }, { assignedTo: req.user._id }],
    };

    const [total, todo, inProgress, done, overdue] = await Promise.all([
      Task.countDocuments(userFilter),
      Task.countDocuments({ ...userFilter, status: 'To Do' }),
      Task.countDocuments({ ...userFilter, status: 'In Progress' }),
      Task.countDocuments({ ...userFilter, status: 'Done' }),
      Task.countDocuments({
        ...userFilter,
        status: { $ne: 'Done' },
        dueDate: { $lt: new Date(), $ne: null },
      }),
    ]);

    res.status(200).json({
      success: true,
      data: { total, todo, inProgress, done, overdue },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Check ownership or assignment
    const userId = req.user._id.toString();
    if (task.createdBy._id.toString() !== userId && task.assignedTo?._id?.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this task' });
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
    const { title, description, status, priority, dueDate, assignedTo } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Only creator can edit task details
    if (task.createdBy.toString() !== req.user._id.toString()) {
      // Assignees can only update status
      if (task.assignedTo?.toString() === req.user._id.toString()) {
        if (status !== undefined) task.status = status;
        const updatedTask = await task.save();
        const populated = await updatedTask.populate([
          { path: 'createdBy', select: 'name email' },
          { path: 'assignedTo', select: 'name email' },
        ]);
        return res.status(200).json({ success: true, data: populated });
      }
      return res.status(403).json({ success: false, message: 'Not authorized to edit this task' });
    }

    // Update fields
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (assignedTo !== undefined) task.assignedTo = assignedTo || null;

    const updatedTask = await task.save();
    const populated = await updatedTask.populate([
      { path: 'createdBy', select: 'name email' },
      { path: 'assignedTo', select: 'name email' },
    ]);

    res.status(200).json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Only creator can delete
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
