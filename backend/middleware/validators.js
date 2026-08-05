const { body, validationResult } = require('express-validator');

const productValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 100 })
    .withMessage('Product name cannot exceed 100 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('sku')
    .trim()
    .notEmpty()
    .withMessage('SKU is required')
    .matches(/^[a-zA-Z0-9-_]+$/)
    .withMessage('SKU can only contain alphanumeric characters, hyphens, and underscores'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a number greater than or equal to 0'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be an integer greater than or equal to 0'),
  body('supplierName')
    .trim()
    .notEmpty()
    .withMessage('Supplier name is required'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: extractedErrors,
  });
};

module.exports = {
  productValidationRules,
  validate,
};
