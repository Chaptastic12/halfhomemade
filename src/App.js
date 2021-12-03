import React, { useState, useEffect, useContext, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Shared/components/NavBar/NavBar';
import SideCart from './Shared/components/UI Elements/SideCart/SideCart';
import HomePage from './pages/HomePage/HomePage';
import RecipePage from './pages/RecipePage/RecipePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage/RecipeDetailsPage';
import Footer from './Shared/components/Footer/Footer';

import { MobileContext } from './Shared/context/mobile-context';
import SideDrawerProvider from './Shared/context/sidedrawer-context';
import AuthProvider from './Shared/context/auth-context';
import { AuthContext } from './Shared/context/auth-context';

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


  const [ userState, setUserState ] = useContext(AuthContext);

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + 'auth/refreshtoken', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(async response => {
      const data = await response.json();
      console.log(data)
      if(response.ok){
        console.log('ok response');
        const data = await response.json();
        setUserState(oldValues => {
          return { ...oldValues, token: data.token}
        })
      } else {
        console.log('bad response');

        setUserState(oldValues => {
          return {...oldValues, token: null }
        })
      }

      //refresh our token if its been 5 mins (300000) to renew our auth token
      setTimeout(verifyUser, 30000)
    })
  }, [setUserState]);

  useEffect(()=>{
    verifyUser();
  }, [verifyUser])

  return (
    <AuthProvider>
      <SideDrawerProvider>
        <MobileContext.Provider value={{isMobile: isMobile, changeMobile: handleWindowSizeChange}}>
          <Router>
            <NavBar />
            <SideCart />

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
            <Footer />
          </Router>
        </MobileContext.Provider>
      </SideDrawerProvider>
    </AuthProvider>
  );
}

export default App;
