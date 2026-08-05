import React from 'react';
import '../styles/Dashboard.css';

const DashboardCards = ({ stats }) => {
  const {
    totalProducts = 0,
    totalStock = 0,
    lowStockProducts = 0,
    outOfStockProducts = 0,
  } = stats || {};

  return (
    <div className="dashboard-grid">
      {/* Total Products */}
      <div className="stat-card blue">
        <div className="stat-card-overlay"></div>
        <div className="stat-header">Total Products</div>
        <div className="stat-value">{totalProducts}</div>
        <div className="stat-desc">Unique SKUs registered</div>
      </div>

      {/* Total Stock */}
      <div className="stat-card green">
        <div className="stat-card-overlay"></div>
        <div className="stat-header">Total Stock</div>
        <div className="stat-value">{totalStock}</div>
        <div className="stat-desc">Total units in inventory</div>
      </div>

      {/* Low Stock count */}
      <div className="stat-card orange">
        <div className="stat-card-overlay"></div>
        <div className="stat-header">Low Stock</div>
        <div className="stat-value">{lowStockProducts}</div>
        <div className="stat-desc">Products under 10 units</div>
      </div>

      {/* Out of Stock count */}
      <div className="stat-card red">
        <div className="stat-card-overlay"></div>
        <div className="stat-header">Out of Stock</div>
        <div className="stat-value">{outOfStockProducts}</div>
        <div className="stat-desc">Quantity is exactly 0</div>
      </div>
    </div>
  );
};

export default DashboardCards;
