import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Shared/components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import RecipePage from './pages/RecipePage/RecipePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage/RecipeDetailsPage';

import { MobileContext } from './Shared/context/mobile-context';
import SideDrawerProvider from './Shared/context/sidedrawer-context';

import './App.css';

function App() {

  ////////////////////////////////////////////////////
  //
  // The following controls if we are mobile or not
  //
  ////////////////////////////////////////////////////
  const [ width, setWidth ] = useState(window.innerWidth);

  //Handles determining our Window size
  const handleWindowSizeChange = () =>{
    setWidth(window.innerWidth);
  }

  //Run the above code dependent on if the window is adjusted or not.
  //This will work dynamically if you are on the computer and shrink your browser
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  //Finally, determine if the window width is less than our minimum value
  //If it is, we are on mobile. If not, we are on PC
  let isMobile = (width <= 768);

  return (
    <SideDrawerProvider>
      <MobileContext.Provider value={{isMobile: isMobile, changeMobile: handleWindowSizeChange}}>
        <Router>
          <NavBar />

          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path='/recipes/all' exact>
              <RecipePage />
            </Route>
            <Route path='/recipes/view/:id' exact>
              <RecipeDetailsPage />
            </Route>
            <Route path='/login' exact>
              <LoginPage />
            </Route>

            <Redirect to="/" exact />
          </Switch>
        </Router>
      </MobileContext.Provider>
    </SideDrawerProvider>
  );
}

export default App;
