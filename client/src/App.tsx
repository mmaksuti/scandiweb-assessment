import React from 'react';
import './styles/App.css';

import Routes from "./routes/AllRoutes";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://mmaksuti.alwaysdata.net/graphql',
  cache: new InMemoryCache()
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    );
  }
}

export default App;