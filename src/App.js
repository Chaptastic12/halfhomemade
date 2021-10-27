import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Shared/components/NavBar/NavBar';

import './App.css';

function App() {
  return (
    <Router>
      <NavBar />

      <Switch>
        <Route path="/" exact>
          {/*Component to load*/}
        </Route>

        <Redirect to="/" exact />
      </Switch>
    </Router>
  );
}

export default App;
