import React from "react";
import { Route } from "react-router-dom";

import Categories from "../pages/Categories";
import Landing from "../pages/Landing";

const privateRoutes = [
  <Route key="categories" exact path="/categories" component={Categories} />,
  <Route key="*" path="/" component={Landing} />,
];

export default privateRoutes;
