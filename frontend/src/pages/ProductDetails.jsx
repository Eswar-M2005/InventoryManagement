import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import Loader from '../components/Loader';
import StockBadge from '../components/StockBadge';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, loading } = useProducts();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id);
      if (data) {
        setProduct(data);
      }
    };
    fetchProduct();
  }, [id, getProduct]);

  if (loading && !product) {
    return <Loader text="Retrieving detailed specifications..." fullPage />;
  }

  if (!product) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h3 className="empty-state-title">Product Not Found</h3>
        <p className="empty-state-desc">The requested product specifications could not be loaded.</p>
        <Link to="/products" className="btn btn-primary">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const formattedCreated = new Date(product.createdAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  
  const formattedUpdated = new Date(product.updatedAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Product Specifications</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Detailed breakdown of SKU attributes and stock status.
          </p>
        </div>
      </div>

      <div className="details-container">
        {/* Header Block */}
        <div className="details-header">
          <div className="details-title-area">
            <span className="details-category">{product.category}</span>
            <h2 className="details-name">{product.name}</h2>
          </div>
          <div className="details-price-badge">
            ${product.price.toFixed(2)}
          </div>
        </div>

        {/* Content Block */}
        <div className="details-body">
          <div className="details-grid">
            <div className="details-item">
              <span className="details-label">Stock Keeping Unit (SKU)</span>
              <span className="details-value" style={{ fontFamily: 'monospace', letterSpacing: '0.5px' }}>
                {product.sku}
              </span>
            </div>

            <div className="details-item">
              <span className="details-label">Supplier Information</span>
              <span className="details-value">{product.supplierName}</span>
            </div>

            <div className="details-item">
              <span className="details-label">Quantity in Stock</span>
              <div style={{ marginTop: '0.25rem' }}>
                <StockBadge quantity={product.quantity} />
              </div>
            </div>

            <div className="details-item">
              <span className="details-label">Stock Status Details</span>
              <span className="details-value">
                {product.quantity === 0 
                  ? 'Currently out of inventory' 
                  : product.quantity < 10 
                    ? 'Critically low inventory levels' 
                    : 'Stock levels are stable'}
              </span>
            </div>

            <div className="details-item">
              <span className="details-label">Registration Date</span>
              <span className="details-value">{formattedCreated}</span>
            </div>

            <div className="details-item">
              <span className="details-label">Last Updated On</span>
              <span className="details-value">{formattedUpdated}</span>
            </div>
          </div>

          {/* Description Block */}
          <div className="details-description">
            <span className="details-label">Item Description</span>
            <p className="details-desc-text">
              {product.description || 'No description provided for this product SKU.'}
            </p>
          </div>
        </div>

        {/* Actions Bottom Bar */}
        <div className="details-actions">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => navigate('/products')}
          >
            Back to Catalog
          </button>
          <Link 
            to={`/products/edit/${product._id}`} 
            className="btn btn-primary"
            id="details-edit-product-btn"
          >
            ✏️ Modify Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
