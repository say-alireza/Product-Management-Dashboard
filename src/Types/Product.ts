export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    category: string;
    rating?: number;
  }
  
  export interface ProductInput {
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    category: string;
  }
  
  export interface ProductsQueryParams {
    page?: number;
    limit?: number;
    search?: string;
  }