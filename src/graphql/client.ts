import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create an HTTP link to our GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        products: {
          // Merge function for pagination
          keyArgs: ['search'],
          merge(existing = [], incoming, { args }) {
            if (args?.page === 1) {
              return incoming;
            }
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

// Create the Apollo Client
export const client = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
  connectToDevTools: true, // Enable Apollo DevTools
}); 