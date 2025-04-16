import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { mockProducts } from './src/Data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// GraphQL Type Definitions
const typeDefs = `
  type Rating {
    rate: Float
    count: Int
  }

  type Product {
    id: ID!
    title: String!
    price: Float!
    description: String!
    category: String!
    image: String!
    rating: Rating
  }

  input ProductInput {
    title: String!
    price: Float!
    description: String!
    category: String!
    image: String!
  }

  type Query {
    products(page: Int, limit: Int, search: String): [Product]!
    product(id: ID!): Product
    categories: [String]!
  }

  type Mutation {
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    products: (_, { page = 1, limit = 10, search = '' }) => {
      try {
        let filteredProducts = [...mockProducts];
        
        // Apply search filter if provided
        if (search) {
          const searchLower = search.toLowerCase();
          filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower)
          );
        }
        
        // Apply pagination
        const start = (page - 1) * limit;
        const end = start + limit;
        return filteredProducts.slice(start, end);
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    },
    product: (_, { id }) => {
      try {
        return mockProducts.find(product => product.id === id) || null;
      } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
      }
    },
    categories: () => {
      try {
        // Extract unique categories from mock products
        const categories = [...new Set(mockProducts.map(product => product.category))];
        return categories;
      } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
    },
  },
  Mutation: {
    createProduct: (_, { input }) => {
      try {
        const newProduct = {
          id: String(mockProducts.length + 1),
          ...input,
          rating: { rate: 0, count: 0 }
        };
        mockProducts.push(newProduct);
        return newProduct;
      } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product');
      }
    },
    updateProduct: (_, { id, input }) => {
      try {
        const index = mockProducts.findIndex(product => product.id === id);
        if (index === -1) {
          throw new Error('Product not found');
        }
        const updatedProduct = { ...mockProducts[index], ...input };
        mockProducts[index] = updatedProduct;
        return updatedProduct;
      } catch (error) {
        console.error(`Error updating product ${id}:`, error);
        throw new Error('Failed to update product');
      }
    },
    deleteProduct: (_, { id }) => {
      try {
        const index = mockProducts.findIndex(product => product.id === id);
        if (index === -1) {
          return false;
        }
        mockProducts.splice(index, 1);
        return true;
      } catch (error) {
        console.error(`Error deleting product ${id}:`, error);
        return false;
      }
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server
await server.start();

// Apply middleware
app.use(cors());
app.use(express.json());
app.use('/graphql', expressMiddleware(server));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
}); 