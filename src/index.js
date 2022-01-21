import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import React from 'react';
import ReactDOM from 'react-dom';
import env from './env';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


const client = new ApolloClient({
  uri: env.GRAPHQL_ENDPOINT,
  request: operation => {
    operation.setContext({
      headers: {
        'x-api-key': env.GRAPHQL_API_KEY,
      }
    })
  }
});

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(

  <Root />,


  document.getElementById('root')
);
