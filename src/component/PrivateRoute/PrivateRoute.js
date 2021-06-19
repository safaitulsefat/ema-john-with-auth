import React from 'react';
import { useContext } from 'react';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({children,...rest}) => {
    const [logInUser,setLogInUser] = useContext(UserContext);
    
    return (
        <div>
            <Route
      {...rest}
      render={({ location }) =>
        logInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
        </div>
    );
};

export default PrivateRoute;