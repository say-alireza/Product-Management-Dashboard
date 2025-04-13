export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    rating?: number;
    category: string;
  }
  
  export interface ProductInput extends Omit<Product, 'id'> {}
  
  export interface ProductsQueryParams {
    page?: number;
    limit?: number;
    search?: string;
  }