import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';
import Loader from '../components/Loader';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, updateProduct, loading } = useProducts();
  const [productData, setProductData] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id);
      if (data) {
        setProductData(data);
      } else {
        setFetchError(true);
      }
    };
    fetchProduct();
  }, [id, getProduct]);

  const handleEditSubmit = async (formData) => {
    const response = await updateProduct(id, formData);
    if (response && response.success) {
      navigate('/products');
    }
  };

  if (loading && !productData) {
    return <Loader text="Loading product records..." fullPage />;
  }

  if (fetchError) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">⚠️</div>
        <h3 className="empty-state-title">Error Loading Product</h3>
        <p className="empty-state-desc">The requested product could not be loaded or doesn't exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Back to Catalog
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Product</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Modify product parameters and adjust stock metrics.
          </p>
        </div>
      </div>

      {loading && <Loader text="Saving modifications..." fullPage />}

      {productData && (
        <ProductForm 
          initialValues={productData} 
          onSubmit={handleEditSubmit} 
          isEdit={true} 
        />
      )}
    </div>
  );
};

export default EditProduct;
