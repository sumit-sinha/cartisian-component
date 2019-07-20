import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login } from './screens/login';
import { Home } from './screens/home';
import { EmployeeList } from './screens/employee'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/home/:id" component={Home} />
      <Route path="/employees" component={EmployeeList} />
    </Router>
  );
}

export default App;
