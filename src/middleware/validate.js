const { body, validationResult } = require('express-validator');

// Validation rules for creating a task
exports.createTaskRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Task title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('Due date must be a valid date'),
  body('category')
    .optional()
    .isIn(['General', 'Work', 'Personal', 'Shopping', 'Health', 'Education', 'Finance', 'Other'])
    .withMessage('Invalid category'),
];

// Validation rules for updating a task
exports.updateTaskRules = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Task title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('Due date must be a valid date'),
  body('category')
    .optional()
    .isIn(['General', 'Work', 'Personal', 'Shopping', 'Health', 'Education', 'Finance', 'Other'])
    .withMessage('Invalid category'),
];

// Middleware to check validation results
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};
