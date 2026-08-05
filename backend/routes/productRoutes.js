const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  searchProducts,
} = require('../controllers/productController');

const { productValidationRules, validate } = require('../middleware/validators');

// Note: Put static sub-routes BEFORE dynamic routes (like /:id) so they don't get matched as /:id
router.get('/search', searchProducts);
router.get('/low-stock', getLowStockProducts);

router.route('/')
  .get(getProducts)
  .post(productValidationRules, validate, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(productValidationRules, validate, updateProduct)
  .delete(deleteProduct);

module.exports = router;
