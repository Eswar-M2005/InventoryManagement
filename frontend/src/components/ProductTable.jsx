import React from 'react';
import { Link } from 'react-router-dom';
import StockBadge from './StockBadge';
import '../styles/Products.css';

const ProductTable = ({ products = [], onDeleteClick }) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h3 className="empty-state-title">No products found</h3>
        <p className="empty-state-desc">
          Try adjusting your search keywords, clearing your filters, or adding a new product record.
        </p>
        <Link to="/products/add" className="btn btn-primary">
          ➕ Add New Product
        </Link>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Details</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Supplier</th>
            <th>Stock Status</th>
            <th style={{ width: '130px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              {/* Product Details Name */}
              <td>
                <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{prod.name}</div>
                {prod.description && (
                  <div 
                    style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--text-muted)', 
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      maxWidth: '220px'
                    }}
                  >
                    {prod.description}
                  </div>
                )}
              </td>
              
              {/* SKU */}
              <td>
                <code style={{ 
                  backgroundColor: 'var(--bg-main)', 
                  padding: '0.2rem 0.4rem', 
                  borderRadius: '4px',
                  fontWeight: 650,
                  color: 'var(--text-main)',
                  fontSize: '0.8rem'
                }}>
                  {prod.sku}
                </code>
              </td>
              
              {/* Category */}
              <td>
                <span style={{ fontSize: '0.875rem' }}>{prod.category}</span>
              </td>
              
              {/* Price */}
              <td>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                  ${prod.price.toFixed(2)}
                </span>
              </td>
              
              {/* Supplier */}
              <td>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {prod.supplierName}
                </span>
              </td>
              
              {/* Stock Status Badge */}
              <td>
                <StockBadge quantity={prod.quantity} />
              </td>
              
              {/* Actions */}
              <td>
                <div className="actions-cell" style={{ justifyContent: 'center' }}>
                  <Link 
                    to={`/products/${prod._id}`} 
                    className="btn-icon" 
                    title="View details"
                  >
                    👁️
                  </Link>
                  <Link 
                    to={`/products/edit/${prod._id}`} 
                    className="btn-icon" 
                    title="Edit product"
                  >
                    ✏️
                  </Link>
                  <button
                    type="button"
                    className="btn-icon delete"
                    title="Delete product"
                    onClick={() => onDeleteClick(prod._id, prod.name)}
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
