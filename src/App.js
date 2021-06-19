import React, { createContext, useState } from 'react';

import './App.css';
import Header from './component/Header/Header';
import Shop from './component/shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './component/review/Review';
import Inventory from './component/inventory/Inventory';
import Notfound from './component/notfound/Notfound';
import Productdetail from './component/productdetail/Productdetail';
import Shipment from './component/Shipment/Shipment';
import Login from './component/Login/Login';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
export const UserContext = createContext();
function App() {
  const [logInUser,setLogInUser]= useState({});
  return (
    <UserContext.Provider value={[logInUser,setLogInUser]}>
      <h3>email: {logInUser.email}</h3>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path='/shop'>
              <Shop></Shop>
          </Route>
          <Route path='/review'>
                <Review></Review>
          </Route>
          <PrivateRoute path='/inventory'>
              <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path='/shipment'>
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route exact path='/'>
            <Shop></Shop>
          </Route>
          <Route path='/product/:productkey'>
            <Productdetail></Productdetail>
          </Route>
          
          <Route path='*'>
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
      
      
    </UserContext.Provider>
  );
}

export default App;
