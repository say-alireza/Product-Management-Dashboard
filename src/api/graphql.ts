import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { mockProducts } from '../Data/mockProducts';
import { gql } from '@apollo/client';

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    stock: Int!
    images: [String!]!
    rating: Float
    category: String!
  }

  input ProductInput {
    name: String!
    description: String!
    price: Float!
    stock: Int!
    images: [String!]!
    category: String!
  }

  type Query {
    products(page: Int, limit: Int, search: String): [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    products: (_: any, { page = 1, limit = 10, search = '' }: { page?: number; limit?: number; search?: string }) => {
      let filteredProducts = [...mockProducts];
      
      if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        );
      }

      const start = (page - 1) * limit;
      const end = start + limit;
      
      return filteredProducts.slice(start, end);
    },
    product: (_: any, { id }: { id: string }) => {
      return mockProducts.find(product => product.id === id);
    },
  },
  Mutation: {
    createProduct: (_: any, { input }: { input: any }) => {
      const newProduct = {
        id: String(mockProducts.length + 1),
        ...input,
        rating: 0,
      };
      mockProducts.push(newProduct);
      return newProduct;
    },
    updateProduct: (_: any, { id, input }: { id: string; input: any }) => {
      const index = mockProducts.findIndex(product => product.id === id);
      if (index === -1) {
        throw new Error('Product not found');
      }
      const updatedProduct = {
        ...mockProducts[index],
        ...input,
      };
      mockProducts[index] = updatedProduct;
      return updatedProduct;
    },
    deleteProduct: (_: any, { id }: { id: string }) => {
      const index = mockProducts.findIndex(product => product.id === id);
      if (index === -1) {
        throw new Error('Product not found');
      }
      mockProducts.splice(index, 1);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server); 