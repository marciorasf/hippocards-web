import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import auth from "../services/auth";

function PrivateRoute({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

function PrivateRoutes() {
  return <Switch></Switch>;
}

export default PrivateRoutes;
