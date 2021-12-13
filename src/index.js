import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { ApolloProvider } from '@apollo/client';
import { client } from './Config/connectation';
import ShopifyDataProvider from './Context/ShopifyData';

const targetModulesData = document.querySelectorAll(
  '.ik-shop-checkout > script[type="application/json"]',
);
targetModulesData.forEach(({ dataset, textContent }) => {
  const root = document.getElementById(`App--${dataset.moduleInstance}`);
  return ReactDOM.render(
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <ShopifyDataProvider>
          <App
            portalId={dataset.portalId}
            moduleData={JSON.parse(textContent)}
            moduleInstance={dataset.moduleInstance}
          />
        </ShopifyDataProvider>
      </ApolloProvider>
    </ErrorBoundary>,
    root,
  );
});
