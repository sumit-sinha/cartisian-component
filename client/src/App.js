import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login } from './screens/login';
import { Home } from './screens/home';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/home/" component={Home} />
    </Router>
  );
}

export default App;
