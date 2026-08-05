const Product = require('../models/Product');

// @desc    Get all products with searching, filtering, sorting & pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const { search, category, sortBy, sortOrder } = req.query;

    // Build filter query
    let query = {};

    // Search filter (name, category, or SKU)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Build sorting parameters
    let sort = {};
    if (sortBy) {
      const order = sortOrder === 'asc' ? 1 : -1;
      sort[sortBy] = order;
    } else {
      sort['createdAt'] = -1; // Default: newest first
    }

    // Execute query
    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    // Get list of unique categories for the filters
    const categories = await Product.distinct('category');

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      categories,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      const error = new Error(`Product not found with id of ${req.params.id}`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Public
const createProduct = async (req, res, next) => {
  try {
    const { name, category, sku, description, price, quantity, supplierName } = req.body;

    // Check SKU uniqueness explicitly
    const skuExists = await Product.findOne({ sku: sku.toUpperCase() });
    if (skuExists) {
      const error = new Error('SKU already exists');
      error.statusCode = 400;
      error.errors = [{ sku: 'SKU is already in use' }];
      return next(error);
    }

    const product = await Product.create({
      name,
      category,
      sku: sku.toUpperCase(),
      description,
      price,
      quantity,
      supplierName,
    });

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = async (req, res, next) => {
  try {
    const { name, category, sku, description, price, quantity, supplierName } = req.body;

    let product = await Product.findById(req.params.id);

    if (!product) {
      const error = new Error(`Product not found with id of ${req.params.id}`);
      error.statusCode = 404;
      return next(error);
    }

    // If SKU is changed, check uniqueness
    if (sku && sku.toUpperCase() !== product.sku) {
      const skuExists = await Product.findOne({ sku: sku.toUpperCase() });
      if (skuExists) {
        const error = new Error('SKU already exists');
        error.statusCode = 400;
        error.errors = [{ sku: 'SKU is already in use' }];
        return next(error);
      }
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.sku = sku ? sku.toUpperCase() : product.sku;
    product.description = description !== undefined ? description : product.description;
    product.price = price !== undefined ? price : product.price;
    product.quantity = quantity !== undefined ? quantity : product.quantity;
    product.supplierName = supplierName || product.supplierName;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      const error = new Error(`Product not found with id of ${req.params.id}`);
      error.statusCode = 404;
      return next(error);
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get low stock products
// @route   GET /api/products/low-stock
// @access  Public
const getLowStockProducts = async (req, res, next) => {
  try {
    // Low stock: quantity < 10
    const products = await Product.find({ quantity: { $lt: 10 } });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search products by keyword
// @route   GET /api/products/search
// @access  Public
const searchProducts = async (req, res, next) => {
  try {
    const keyword = req.query.keyword || '';
    const query = keyword
      ? {
          $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { category: { $regex: keyword, $options: 'i' } },
            { sku: { $regex: keyword, $options: 'i' } },
          ],
        }
      : {};

    const products = await Product.find(query);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  searchProducts,
};

