import React, { createContext, useState, useContext, useCallback } from 'react';
import { productAPI, dashboardAPI } from '../services/api';
import { toast } from 'react-toastify';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch all products (handles pagination, search, category, sort)
  const getProducts = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.getAll(params);
      if (response.data && response.data.success) {
        setProducts(response.data.data);
        setTotalProducts(response.data.total);
        setTotalPages(response.data.pages);
        setCurrentPage(response.data.page);
        if (response.data.categories) {
          setCategories(response.data.categories);
        }
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Failed to fetch products';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch product by ID
  const getProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.getById(id);
      if (response.data && response.data.success) {
        setCurrentProduct(response.data.data);
        return response.data.data;
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Failed to load product details';
      setError(errMsg);
      toast.error(errMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add Product
  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.create(productData);
      if (response.data && response.data.success) {
        toast.success('Product created successfully');
        return { success: true, data: response.data.data };
      }
    } catch (err) {
      console.error(err);
      const validationErrors = err.response?.data?.errors;
      const errMsg = err.response?.data?.message || 'Failed to create product';
      
      if (validationErrors && Array.isArray(validationErrors)) {
        validationErrors.forEach((errorObj) => {
          const field = Object.keys(errorObj)[0];
          toast.error(`${field.toUpperCase()}: ${errorObj[field]}`);
        });
      } else {
        toast.error(errMsg);
      }
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  // Update Product
  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.update(id, productData);
      if (response.data && response.data.success) {
        toast.success('Product updated successfully');
        return { success: true, data: response.data.data };
      }
    } catch (err) {
      console.error(err);
      const validationErrors = err.response?.data?.errors;
      const errMsg = err.response?.data?.message || 'Failed to update product';

      if (validationErrors && Array.isArray(validationErrors)) {
        validationErrors.forEach((errorObj) => {
          const field = Object.keys(errorObj)[0];
          toast.error(`${field.toUpperCase()}: ${errorObj[field]}`);
        });
      } else {
        toast.error(errMsg);
      }
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productAPI.delete(id);
      if (response.data && response.data.success) {
        toast.success('Product deleted successfully');
        return true;
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Failed to delete product';
      setError(errMsg);
      toast.error(errMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch Dashboard Stats
  const getDashboardStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardAPI.getStats();
      if (response.data && response.data.success) {
        setDashboardStats(response.data.data);
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Failed to load dashboard metrics';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        currentProduct,
        dashboardStats,
        loading,
        error,
        currentPage,
        totalPages,
        totalProducts,
        getProducts,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        getDashboardStats,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
