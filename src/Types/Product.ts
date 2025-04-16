export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
      rate: number;
      count: number;
    };
  }
  
  export interface ProductInput {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }
  
  export interface ProductsQueryParams {
    limit?: number;
    sort?: string;
    order?: string;
  }