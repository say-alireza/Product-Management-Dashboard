# Product Management Dashboard

A React application for managing products with GraphQL integration with Shopify's Storefront API.

## Features

- Product listing with filtering and search
- Product details view
- Admin panel for CRUD operations on products
- Integration with Shopify's Storefront API via GraphQL
- Responsive design with Bootstrap

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Shopify store with Storefront API access

## Setup

1. Clone the repository:

   ```
   git clone <repository-url>
   cd product-management-dashboard
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your Shopify API token:

   ```
   SHOPIFY_STOREFRONT_TOKEN=your_shopify_storefront_access_token
   ```

4. Update the Shopify store URL in `src/graphql/client.ts`:
   ```typescript
   const httpLink = createHttpLink({
     uri: "https://your-store.myshopify.com/api/2024-01/graphql.json",
     // ...
   });
   ```

## Running the Application

### Development Mode

To run both the Vite development server and the proxy server:

```
npm run dev:all
```

This will start:

- Vite development server on http://localhost:5173
- Proxy server on http://localhost:3000

### Production Build

1. Build the application:

   ```
   npm run build
   ```

2. Start the server:
   ```
   npm run server
   ```

The application will be available at http://localhost:3000.

## Project Structure

- `src/` - Source code
  - `components/` - Reusable UI components
  - `graphql/` - GraphQL schema and client configuration
  - `hooks/` - Custom React hooks
  - `Pages/` - Page components
  - `Types/` - TypeScript type definitions
  - `Data/` - Mock data and utilities
- `server.js` - Express server for proxying requests to Shopify API
- `vite.config.ts` - Vite configuration

## Troubleshooting

### CORS Issues

If you encounter CORS issues when connecting to Shopify's API, make sure:

1. The proxy server is running correctly
2. Your Shopify Storefront API token is valid
3. The Shopify store URL is correct

### GraphQL Errors

If you see GraphQL errors in the console:

1. Check that your Shopify Storefront API token has the necessary permissions
2. Verify that the GraphQL queries in `src/graphql/schema.ts` match your Shopify store's schema
3. Check the network tab in your browser's developer tools for detailed error messages

## License

MIT
