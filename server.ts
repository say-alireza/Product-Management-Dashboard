import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { mockProducts } from './src/Data/mockProducts';
import { Product, ProductInput } from './src/Types/Product';

const app = express();

// Basic Express middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4000'], // Add your frontend URL
  credentials: true
}));
app.use(express.json());

const typeDefs = `#graphql
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
    createProduct: (_: any, { input }: { input: ProductInput }) => {
      const newProduct: Product = {
        id: String(mockProducts.length + 1),
        ...input,
        rating: 0,
      };
      mockProducts.push(newProduct);
      return newProduct;
    },
    updateProduct: (_: any, { id, input }: { id: string; input: ProductInput }) => {
      const index = mockProducts.findIndex(product => product.id === id);
      if (index === -1) {
        throw new Error('Product not found');
      }
      const updatedProduct: Product = {
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

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enable introspection in development
  });

  await server.start();

  // Apply Apollo middleware with proper CORS configuration
  app.use('/graphql', 
    cors<cors.CorsRequest>({
      origin: ['http://localhost:5173', 'http://localhost:4000'],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
}

// Start the server
startServer().catch(err => {
  console.error('Failed to start server:', err);
}); 