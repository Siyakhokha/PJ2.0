import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://ikhokha.myshopify.com/api/2021-07/graphql.json',
});

const authLink = setContext(() => ({
  headers: {
    'X-Shopify-Storefront-Access-Token': '8ee7fbad1afb2c1b468bbba4b4bf6dfd',
    'Content-Type': 'application/json',
  },
}));

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
