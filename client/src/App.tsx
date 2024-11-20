import React from 'react';
import './styles/App.css';

import Routes from "./routes/AllRoutes";

class App extends React.Component {
  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;