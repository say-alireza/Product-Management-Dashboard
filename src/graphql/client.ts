import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create an HTTP link to our GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create the Apollo Client
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
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