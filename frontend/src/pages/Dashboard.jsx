import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import DashboardCards from '../components/DashboardCards';
import Loader from '../components/Loader';
import StockBadge from '../components/StockBadge';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/Dashboard.css';

// Register ChartJS elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { dashboardStats, loading, getDashboardStats } = useProducts();

  useEffect(() => {
    getDashboardStats();
  }, [getDashboardStats]);

  if (loading && !dashboardStats) {
    return <Loader text="Loading dashboard analytics..." fullPage />;
  }

  const stats = dashboardStats;

  // Chart 1 Data: Category-wise product stock
  const categoryLabels = stats?.categoryStats?.map((c) => c._id) || [];
  const categoryStockData = stats?.categoryStats?.map((c) => c.totalStock) || [];

  const barChartData = {
    labels: categoryLabels,
    datasets: [
      {
        label: 'Stock Quantity',
        data: categoryStockData,
        backgroundColor: 'rgba(79, 70, 229, 0.75)',
        borderColor: 'rgb(79, 70, 229)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'var(--border-color)',
        },
        ticks: {
          color: 'var(--text-muted)',
          font: { family: 'Outfit' },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'var(--text-muted)',
          font: { family: 'Outfit' },
        },
      },
    },
  };

  // Chart 2 Data: Stock Distribution
  const dist = stats?.stockDistribution || { outOfStock: 0, lowStock: 0, moderateStock: 0, highStock: 0 };
  
  const doughnutChartData = {
    labels: ['Out of Stock (0)', 'Low Stock (<10)', 'Moderate (10-20)', 'In Stock (>20)'],
    datasets: [
      {
        data: [dist.outOfStock, dist.lowStock, dist.moderateStock, dist.highStock],
        backgroundColor: [
          '#64748b', // Out of stock (Gray)
          '#ef4444', // Low stock (Red)
          '#f59e0b', // Moderate (Yellow)
          '#10b981', // High stock (Green)
        ],
        borderWidth: 2,
        borderColor: 'white',
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'var(--text-main)',
          font: { family: 'Outfit', size: 11 },
          padding: 12,
        },
      },
    },
  };

  const hasProducts = stats?.totalProducts > 0;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Inventory Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Real-time analytics and stock levels overview.
          </p>
        </div>
        <Link to="/products/add" className="btn btn-primary" id="dashboard-add-product-btn">
          ➕ Add Product
        </Link>
      </div>

      {stats && <DashboardCards stats={stats} />}

      {!hasProducts ? (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <h3 className="empty-state-title">No inventory metrics available</h3>
          <p className="empty-state-desc">
            Your stock registry is empty. Add your first product to generate metrics.
          </p>
          <Link to="/products/add" className="btn btn-primary">
            ➕ Add First Product
          </Link>
        </div>
      ) : (
        <div className="dashboard-content-grid">
          {/* Charts Row */}
          <div className="chart-panel-group">
            {/* Category Stock Level Bar Chart */}
            <div className="panel">
              <div className="panel-header">
                <h3 className="panel-title">Stock Levels by Category</h3>
              </div>
              <div className="chart-container">
                {categoryLabels.length > 0 ? (
                  <Bar data={barChartData} options={barChartOptions} />
                ) : (
                  <p style={{ color: 'var(--text-muted)' }}>No data available</p>
                )}
              </div>
            </div>

            {/* Stock Distribution Doughnut Chart */}
            <div className="panel">
              <div className="panel-header">
                <h3 className="panel-title">Stock Distribution Status</h3>
              </div>
              <div className="chart-container">
                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
              </div>
            </div>
          </div>

          {/* Recent Products Panel */}
          <div className="panel">
            <div className="panel-header">
              <h3 className="panel-title">Recently Added</h3>
              <Link 
                to="/products" 
                style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: 600 }}
              >
                View All &rarr;
              </Link>
            </div>
            
            <div className="recent-products-list">
              {stats?.recentProducts && stats.recentProducts.length > 0 ? (
                stats.recentProducts.map((prod) => (
                  <div key={prod._id} className="recent-product-item">
                    <div className="recent-product-info">
                      <span className="recent-product-name">{prod.name}</span>
                      <span className="recent-product-meta">SKU: {prod.sku} | {prod.category}</span>
                    </div>
                    <div className="recent-product-stock">
                      <span className="recent-product-price">${prod.price.toFixed(2)}</span>
                      <StockBadge quantity={prod.quantity} />
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No recent products.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
