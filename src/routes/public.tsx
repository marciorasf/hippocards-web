import React from "react";
import { Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

const publicRoutes = [
  <Route exact key="landing" path="/" component={Landing} />,
  <Route exact key="login" path="/login" component={Login} />,
  <Route exact key="register" path="/register" component={Register} />,
];

export default publicRoutes;
