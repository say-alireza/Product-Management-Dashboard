import axios, { AxiosError } from 'axios';
import { Product, ProductInput } from '../Types/Product';
import { mockProducts } from '../Data/mockData';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.escuelajs.co/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
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

// Helper function to convert Platzi API product to our Product type
const convertPlatziProduct = (platziProduct: any): Product => {
  return {
    id: String(platziProduct.id),
    name: platziProduct.title,
    description: platziProduct.description,
    price: platziProduct.price,
    stock: platziProduct.category?.id || 10, // Using category ID as stock for demo
    images: [platziProduct.images?.[0] || '/placeholder.svg'],
    category: platziProduct.category?.name || 'Uncategorized'
  };
};

// API functions with fallback to mock data
export const productAPI = {
  // Get all products
  async getAll(): Promise<Product[]> {
    try {
      console.log('Attempting to fetch products from Platzi API...');
      const response = await api.get('/products');
      console.log('Successfully fetched products:', response.data.length);
      return response.data.map(convertPlatziProduct);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('API Error Details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            baseURL: error.config?.baseURL
          }
        });
      }
      console.warn('Falling back to mock data due to API error:', error);
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockProducts;
    }
  },

  // Get product by ID
  async getById(id: string): Promise<Product> {
    try {
      const response = await api.get(`/products/${id}`);
      return convertPlatziProduct(response.data);
    } catch (error) {
      console.warn('Falling back to mock data due to API error:', error);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      const product = mockProducts.find(p => p.id === id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return product;
    }
  },

  // Create new product
  async create(product: ProductInput): Promise<Product> {
    try {
      // Convert our product format to Platzi API format
      const platziProduct = {
        title: product.name,
        price: product.price,
        description: product.description,
        categoryId: 1, // Default category
        images: product.images || ['https://placeimg.com/640/480/tech']
      };
      
      const response = await api.post('/products', platziProduct);
      return convertPlatziProduct(response.data);
    } catch (error) {
      console.warn('Falling back to mock data due to API error:', error);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 700));
      const newProduct: Product = {
        ...product,
        id: String(mockProducts.length + 1)
      };
      return newProduct;
    }
  },

  // Update product
  async update(id: string, product: Partial<ProductInput>): Promise<Product> {
    try {
      // Convert our product format to Platzi API format
      const platziProduct: any = {};
      if (product.name) platziProduct.title = product.name;
      if (product.price) platziProduct.price = product.price;
      if (product.description) platziProduct.description = product.description;
      if (product.images) platziProduct.images = product.images;
      
      const response = await api.put(`/products/${id}`, platziProduct);
      return convertPlatziProduct(response.data);
    } catch (error) {
      console.warn('Falling back to mock data due to API error:', error);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      const existingProduct = mockProducts.find(p => p.id === id);
      if (!existingProduct) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return {
        ...existingProduct,
        ...product
      };
    }
  },

  // Delete product
  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.warn('Falling back to mock data due to API error:', error);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real app with mock data, we would remove the product from the mock data
      // For now, we'll just return successfully
    }
  },

  // Search products
  async search(query: string): Promise<Product[]> {
    try {
      // Platzi API doesn't have a direct search endpoint, so we'll fetch all and filter
      const response = await api.get('/products');
      const filteredProducts = response.data.filter((product: any) => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      return filteredProducts.map(convertPlatziProduct);
    } catch (error) {
      console.warn('Falling back to mock data due to API error:', error);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
}; 