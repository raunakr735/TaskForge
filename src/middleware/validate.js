const { body, validationResult } = require('express-validator');

// Constants (clean & reusable)
const STATUS = ['todo', 'in-progress', 'done'];
const PRIORITY = ['low', 'medium', 'high'];

// Wrapper function
const runValidation = (validations) => {
  return async (req, res, next) => {
    try {
      for (const validation of validations) {
        await validation.run(req);
      }

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
    } catch (error) {
      next(error);
    }
  };
};

// Create Task Validation
const createTaskValidation = runValidation([
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

  body('status')
    .optional()
    .isIn(STATUS)
    .withMessage('Invalid status value'),

  body('priority')
    .optional()
    .isIn(PRIORITY)
    .withMessage('Invalid priority value'),

  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('Invalid date format'),

  body('assignedTo')
    .optional({ values: 'null' })
    .isMongoId()
    .withMessage('Invalid user ID'),
]);

// Update Task Validation
const updateTaskValidation = runValidation([
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title too long'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description too long'),

  body('status')
    .optional()
    .isIn(STATUS)
    .withMessage('Invalid status'),

  body('priority')
    .optional()
    .isIn(PRIORITY)
    .withMessage('Invalid priority'),

  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('Invalid date'),

  body('assignedTo')
    .optional({ values: 'null' })
    .isMongoId()
    .withMessage('Invalid user ID'),
]);

// Register Validation
const registerValidation = runValidation([
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name too long'),

  body('email')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Minimum 6 characters required')
    .matches(/[A-Z]/)
    .withMessage('Must contain uppercase letter')
    .matches(/[0-9]/)
    .withMessage('Must contain a number'),
]);

// Login Validation
const loginValidation = runValidation([
  body('email')
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
]);

module.exports = {
  createTaskValidation,
  updateTaskValidation,
  registerValidation,
  loginValidation,
};