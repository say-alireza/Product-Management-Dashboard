import { gql } from '@apollo/client';

export const typeDefs = gql`
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
    category: String!
    images: [String!]!
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

export const GET_PRODUCTS = gql`
  query GetProducts($page: Int, $limit: Int, $search: String) {
    products(page: $page, limit: $limit, search: $search) {
      id
      name
      description
      price
      stock
      images
      rating
      category
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      stock
      images
      rating
      category
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
      stock
      images
      rating
      category
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      description
      price
      stock
      images
      rating
      category
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`; 