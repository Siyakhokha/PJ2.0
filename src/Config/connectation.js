import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from '@apollo/client/link/context';

  const httpLink = createHttpLink({
  uri: process.env.STOREFRONT_URL,
});

const authLink = setContext(() => ({
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.STOREFRONT_TOKEN,
    'Content-Type': 'application/json',
    // 'X-XSS-Protection': '1, report=<reporting-uri>',
  },
}));


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

