import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Shared/components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';

import './App.css';

function App() {
  return (
    <Router>
      <NavBar />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Redirect to="/" exact />
      </Switch>
    </Router>
  );
}

export default App;
