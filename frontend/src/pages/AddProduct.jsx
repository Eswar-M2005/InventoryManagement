import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';
import Loader from '../components/Loader';

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct, loading } = useProducts();

  const handleAddSubmit = async (formData) => {
    const response = await addProduct(formData);
    if (response && response.success) {
      navigate('/products');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Create Product</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Register a new item in the warehouse inventory system.
          </p>
        </div>
      </div>

      {loading && <Loader text="Submitting new product..." fullPage />}
      
      <ProductForm onSubmit={handleAddSubmit} isEdit={false} />
    </div>
  );
};

export default AddProduct;
