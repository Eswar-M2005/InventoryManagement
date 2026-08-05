const Product = require('../models/Product');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Public
const getDashboardStats = async (req, res, next) => {
  try {
    // 1. Total Products
    const totalProducts = await Product.countDocuments({});

    // 2. Total Stock Quantity
    const totalStockResult = await Product.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$quantity' },
        },
      },
    ]);
    const totalStock = totalStockResult.length > 0 ? totalStockResult[0].total : 0;

    // 3. Low Stock Products Count (1 <= quantity < 10)
    const lowStockCount = await Product.countDocuments({
      quantity: { $gt: 0, $lt: 10 },
    });

    // 4. Out of Stock Products Count (quantity = 0)
    const outOfStockCount = await Product.countDocuments({
      quantity: 0,
    });

    // 5. Recent Products (latest 5)
    const recentProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    // 6. Category-wise statistics (Product count and Total stock per category)
    const categoryStats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalStock: { $sum: '$quantity' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // 7. Stock Status Distribution Count (Green > 20, Yellow 10-20, Red 1-9, Gray 0)
    const outOfStock = outOfStockCount;
    const lowStock = lowStockCount;
    const moderateStock = await Product.countDocuments({
      quantity: { $gte: 10, $lte: 20 },
    });
    const highStock = await Product.countDocuments({
      quantity: { $gt: 20 },
    });

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalStock,
        lowStockProducts: lowStock,
        outOfStockProducts: outOfStock,
        recentProducts,
        categoryStats,
        stockDistribution: {
          outOfStock,
          lowStock,
          moderateStock,
          highStock,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
