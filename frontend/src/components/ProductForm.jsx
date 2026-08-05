import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

const ProductForm = ({ initialValues, onSubmit, isEdit = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sku: '',
    description: '',
    price: 0,
    quantity: 0,
    supplierName: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || '',
        category: initialValues.category || '',
        sku: initialValues.sku || '',
        description: initialValues.description || '',
        price: initialValues.price !== undefined ? initialValues.price : 0,
        quantity: initialValues.quantity !== undefined ? initialValues.quantity : 0,
        supplierName: initialValues.supplierName || '',
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? (value === '' ? '' : Number(value)) : value,
    }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Product name is required';
    if (!formData.category.trim()) tempErrors.category = 'Category is required';
    if (!formData.sku.trim()) {
      tempErrors.sku = 'SKU is required';
    } else if (!/^[a-zA-Z0-9-_]+$/.test(formData.sku)) {
      tempErrors.sku = 'SKU can only contain alphanumeric characters, hyphens, and underscores';
    }
    
    if (formData.price === '' || formData.price === null) {
      tempErrors.price = 'Price is required';
    } else if (Number(formData.price) < 0) {
      tempErrors.price = 'Price cannot be negative';
    }
    
    if (formData.quantity === '' || formData.quantity === null) {
      tempErrors.quantity = 'Quantity is required';
    } else if (Number(formData.quantity) < 0) {
      tempErrors.quantity = 'Quantity cannot be negative';
    } else if (!Number.isInteger(Number(formData.quantity))) {
      tempErrors.quantity = 'Quantity must be an integer';
    }
    
    if (!formData.supplierName.trim()) tempErrors.supplierName = 'Supplier name is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const categoriesSuggestions = [
    'Electronics',
    'Clothing',
    'Home Appliance',
    'Furniture',
    'Stationery',
    'Food & Beverage',
    'Sports Equipment',
    'Automotive',
  ];

  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="form-title">{isEdit ? 'Update Product Details' : 'Add New Product'}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-body">
          <div className="form-grid">
            {/* Product Name */}
            <div className="form-group full-width">
              <label className="form-label" htmlFor="name">Product Name <span>*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Wireless Noise Cancelling Headphones"
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label" htmlFor="category">Category <span>*</span></label>
              <input
                type="text"
                id="category"
                name="category"
                list="categories-list"
                className={`form-input ${errors.category ? 'error' : ''}`}
                value={formData.category}
                onChange={handleChange}
                placeholder="Select or type category"
              />
              <datalist id="categories-list">
                {categoriesSuggestions.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
              {errors.category && <span className="field-error">{errors.category}</span>}
            </div>

            {/* SKU */}
            <div className="form-group">
              <label className="form-label" htmlFor="sku">SKU (Stock Keeping Unit) <span>*</span></label>
              <input
                type="text"
                id="sku"
                name="sku"
                className={`form-input ${errors.sku ? 'error' : ''}`}
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. WH-1000XM4"
                disabled={isEdit} // SKU shouldn't be editable typically, or we allow it
              />
              {errors.sku && <span className="field-error">{errors.sku}</span>}
            </div>

            {/* Price */}
            <div className="form-group">
              <label className="form-label" htmlFor="price">Price ($) <span>*</span></label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0"
                className={`form-input ${errors.price ? 'error' : ''}`}
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
              />
              {errors.price && <span className="field-error">{errors.price}</span>}
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label className="form-label" htmlFor="quantity">Quantity <span>*</span></label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                className={`form-input ${errors.quantity ? 'error' : ''}`}
                value={formData.quantity}
                onChange={handleChange}
                placeholder="0"
              />
              {errors.quantity && <span className="field-error">{errors.quantity}</span>}
            </div>

            {/* Supplier Name */}
            <div className="form-group full-width">
              <label className="form-label" htmlFor="supplierName">Supplier Name <span>*</span></label>
              <input
                type="text"
                id="supplierName"
                name="supplierName"
                className={`form-input ${errors.supplierName ? 'error' : ''}`}
                value={formData.supplierName}
                onChange={handleChange}
                placeholder="e.g. Sony Logistics USA"
              />
              {errors.supplierName && <span className="field-error">{errors.supplierName}</span>}
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="form-input form-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed description of the product features, specs..."
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            id="submit-product-btn"
          >
            {isEdit ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
