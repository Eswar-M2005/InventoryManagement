import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { dashboardStats, getDashboardStats } = useProducts();

  useEffect(() => {
    // Fetch stats on mount to populate the low stock alert badge
    getDashboardStats();
  }, [getDashboardStats]);

  const lowStockCount = dashboardStats?.lowStockProducts || 0;

  return (
    <aside className="sidebar" id="app-sidebar">
      <div className="sidebar-logo">
        <span>STOCKVIBE</span>
      </div>

      <nav className="sidebar-menu">
        <NavLink 
          to="/" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          end
        >
          <div className="sidebar-link-inner">
            <span className="sidebar-icon">📊</span>
            <span>Dashboard</span>
          </div>
        </NavLink>

        <NavLink 
          to="/products" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          end
        >
          <div className="sidebar-link-inner">
            <span className="sidebar-icon">📦</span>
            <span>Products List</span>
          </div>
          {lowStockCount > 0 && (
            <span className="sidebar-alert-badge" title={`${lowStockCount} products are low in stock`}>
              {lowStockCount}
            </span>
          )}
        </NavLink>

        <NavLink 
          to="/products/add" 
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <div className="sidebar-link-inner">
            <span className="sidebar-icon">➕</span>
            <span>Add Product</span>
          </div>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div style={{ fontWeight: 600, color: 'var(--text-light)', marginBottom: '0.25rem' }}>StockVibe v1.0</div>
        <div>Control Center</div>
      </div>
    </aside>
  );
};

export default Sidebar;
