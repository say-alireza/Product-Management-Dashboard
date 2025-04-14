import { useState, useEffect } from "react";
import { Product, ProductInput } from "../Types/Product";
import axios from "axios";

// Using FakeStore API as a public product API
const API_URL = "https://fakestoreapi.com";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      
      // Transform the API response to match our Product type
      const transformedProducts = response.data.map((item: any) => ({
        id: item.id.toString(),
        name: item.title,
        description: item.description,
        price: item.price,
        stock: Math.floor(Math.random() * 100), // FakeStore doesn't provide stock
        images: [item.image],
        rating: item.rating?.rate || 0,
        category: item.category
      }));
      
      setProducts(transformedProducts);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (input: ProductInput) => {
    try {
      // Transform our ProductInput to match FakeStore API format
      const apiInput = {
        title: input.name,
        price: input.price,
        description: input.description,
        category: input.category,
        image: input.images?.[0] || "https://via.placeholder.com/150"
      };
      
      const response = await axios.post(`${API_URL}/products`, apiInput);
      
      // Transform the response back to our Product type
      const newProduct: Product = {
        id: response.data.id.toString(),
        name: response.data.title,
        description: response.data.description,
        price: response.data.price,
        stock: Math.floor(Math.random() * 100),
        images: [response.data.image],
        rating: 0,
        category: response.data.category
      };
      
      setProducts(prev => [...prev, newProduct]);
      return { success: true, data: newProduct };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : "Error creating product"
      };
    }
  };

  const updateProduct = async (id: string, input: ProductInput) => {
    try {
      // Transform our ProductInput to match FakeStore API format
      const apiInput = {
        title: input.name,
        price: input.price,
        description: input.description,
        category: input.category,
        image: input.images?.[0] || "https://via.placeholder.com/150"
      };
      
      const response = await axios.put(`${API_URL}/products/${id}`, apiInput);
      
      // Transform the response back to our Product type
      const updatedProduct: Product = {
        id: response.data.id.toString(),
        name: response.data.title,
        description: response.data.description,
        price: response.data.price,
        stock: Math.floor(Math.random() * 100),
        images: [response.data.image],
        rating: 0,
        category: response.data.category
      };
      
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? updatedProduct : product
        )
      );
      return { success: true, data: updatedProduct };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : "Error updating product"
      };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
      setProducts(prev => prev.filter(product => product.id !== id));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err instanceof Error ? err.message : "Error deleting product"
      };
    }
  };

  const searchProducts = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply pagination
  const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);

  return {
    products: paginatedProducts,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    page,
    setPage,
    hasMore: filteredProducts.length > page * limit,
    totalProducts: filteredProducts.length
  };
} 