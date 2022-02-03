import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Shared/components/NavBar/NavBar';
import SideCart from './Shared/components/UI Elements/SideCart/SideCart';
import HomePage from './pages/HomePage/HomePage';
import RecipePage from './pages/RecipePage/RecipePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage/RecipeDetailsPage';
import RecipeAddPage from './pages/RecipeAddPage/RecipeAddPage';
import BookAddPage from './pages/BookAddPage/BookAddPage';
import ShopPage from './pages/ShopPage/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
// import AdminPage from './pages/AdminPage/AdminPage';
import Footer from './Shared/components/Footer/Footer';

import Providers from './Shared/context/Providers';

import SessionTimer from './Shared/components/SessionTimer';
import './App.css';

function App() {
  window.onunload = () => {
    sessionStorage.removeItem('sessionStart');
  }

//////////////////
//
//  Below is for the refresh token; but the FETCH call does not work as the server does not receive any secretCookies
//  Disabled this for now as it is not needed for MVP
//
//////////////////

  // const [ userState, setUserState ] = useContext(AuthContext);

  // const verifyUser = useCallback(() => {
  //   fetch(process.env.REACT_APP_API_ENDPOINT + 'auth/refreshtoken', {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //   .then(async response => {
  //     const data = await response.json();
  //     console.log(data)
  //     if(response.ok){
  //       console.log('ok response');
  //       const data = await response.json();
  //       setUserState(oldValues => {
  //         return { ...oldValues, token: data.token}
  //       })
  //     } else {
  //       console.log('bad response');

  //       setUserState(oldValues => {
  //         return {...oldValues, token: null }
  //       })
  //     }

  //     //refresh our token if its been 5 mins (300000) to renew our auth token
  //     setTimeout(verifyUser, 30000)
  //   })
  // }, [setUserState]);

  // useEffect(()=>{
  //   verifyUser();
  // }, [verifyUser])

  return (
    <Providers>
      <Router>
        <SessionTimer />
        <NavBar />
        <SideCart />

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path='/recipes/search/:filter' exact><RecipePage /></Route>
          <Route path='/recipes/view/:id' exact component={RecipeDetailsPage} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/recipes/add' exact component={RecipeAddPage} />
          <Route path='/recipes/edit/:id' exact> <RecipeAddPage edit/> </Route>
          <Route path='/book/add' exact component={BookAddPage} />
          <Route path='/shop/search/:id' exact component={ShopPage} />
          <Route path='/shop/product/:id' exact component={ProductDetailsPage}/>
          {/* <Route path='/admin' exact component={AdminPage} /> */}

          <Redirect to="/" exact />
        </Switch>
        <Footer />
      </Router>
    </Providers>
  );
}

export default App;
