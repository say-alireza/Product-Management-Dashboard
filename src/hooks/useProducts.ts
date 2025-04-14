import { useState, useEffect } from 'react';
import { Product } from '../Types/Product';
import { mockProducts } from '../Data/mockData';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const createProduct = async (input: Product) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const newProduct = {
        ...input,
        id: String(products.length + 1),
      };
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      throw new Error('Failed to create product');
    }
  };

  const updateProduct = async (id: string, input: Product) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? { ...product, ...input } : product
        )
      );
      return { ...input, id };
    } catch (err) {
      throw new Error('Failed to update product');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(prev => prev.filter(product => product.id !== id));
      return true;
    } catch (err) {
      throw new Error('Failed to delete product');
    }
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  };
} 