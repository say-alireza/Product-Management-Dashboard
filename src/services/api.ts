import axios, { AxiosError } from 'axios';
import { Product, ProductInput } from '../Types/Product';
import { mockProducts, mockProductsQuery } from '../Data/mockProducts';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler
const handleError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response error:', error.response.data);
    throw new Error(
      typeof error.response.data === 'object' && error.response.data !== null && 'message' in error.response.data
        ? String(error.response.data.message)
        : 'An error occurred with the response'
    );
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request error:', error.request);
    throw new Error('No response received from server');
  } else {
    // Something happened in setting up the request
    console.error('Error:', error.message);
    throw new Error('Error setting up the request');
  }
};

// Mock API functions that use local data
export const productAPI = {
  // Get all products
  async getAll(): Promise<Product[]> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockProducts;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  // Get product by ID
  async getById(id: string): Promise<Product> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      const product = mockProducts.find(p => p.id === id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  // Create new product
  async create(product: ProductInput): Promise<Product> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 700));
      const newProduct: Product = {
        ...product,
        id: String(mockProducts.length + 1)
      };
      // In a real app, we would send this to the server
      // For now, we'll just return the new product
      return newProduct;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  // Update product
  async update(id: string, product: Partial<ProductInput>): Promise<Product> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      const existingProduct = mockProducts.find(p => p.id === id);
      if (!existingProduct) {
        throw new Error(`Product with ID ${id} not found`);
      }
      // In a real app, we would send this to the server
      // For now, we'll just return the updated product
      return {
        ...existingProduct,
        ...product
      };
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  // Delete product
  async delete(id: string): Promise<void> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 400));
      const productExists = mockProducts.some(p => p.id === id);
      if (!productExists) {
        throw new Error(`Product with ID ${id} not found`);
      }
      // In a real app, we would send this to the server
      // For now, we'll just return
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },

  // Search products
  async search(query: string): Promise<Product[]> {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockProductsQuery({ search: query });
    } catch (error) {
      return handleError(error as AxiosError);
    }
  }
}; 