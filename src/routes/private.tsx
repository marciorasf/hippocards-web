import React from "react";
import { Route } from "react-router-dom";

import Categories from "../pages/Categories";

const privateRoutes = [
  <Route key="categories" exact path="/categories" component={Categories} />,
];

export default privateRoutes;
