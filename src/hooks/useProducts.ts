import { useState, useEffect } from 'react';
import { mockProductsQuery } from '../Data/mockProducts';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(mockProductsQuery({}));
      setError(null);
    } catch (err) {
      setError('خطا در دریافت اطلاعات محصولات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const searchProducts = (query: string) => {
    const filtered = mockProductsQuery({ search: query });
    setProducts(filtered);
  };

  return { products, loading, error, searchProducts };
} 