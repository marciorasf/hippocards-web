import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AuthService from "../services/auth";

function NotLoggedRoute({ component: Component, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthService.isAuthenticated() ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

function NotLoggedRoutes() {
  return <Switch></Switch>;
}

export default NotLoggedRoutes;
