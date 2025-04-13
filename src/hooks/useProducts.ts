import { useState, useEffect } from 'react';
import { Product } from '../Types/Product';
import { productAPI } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productAPI.getAll();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productAPI.search(query);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching products');
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    refreshProducts: fetchProducts,
    searchProducts
  };
}; 